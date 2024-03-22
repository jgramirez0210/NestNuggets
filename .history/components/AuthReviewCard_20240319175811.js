import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getWasThisHelpfulReviewById from './WasThisHelpfulComponent';
import { deleteReview, getWasThisHelpfulReviewRating } from '../api/reviewData';
import GetStars from './GetStars';

function AuthReviewCard({
  reviewObj, onDashboard, onUpdate,
}) {
  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
  };
  const [helpfulReviews, setHelpfulReviews] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const countRatings = (data) => {
    const ratings = data.filter((rating) => !Number.isNaN(rating));
    return ratings.length;
  };

  useEffect(() => {
    getWasThisHelpfulReviewRating(reviewObj.firebaseKey)
      .then((data) => {
        if (Array.isArray(data)) {
          const ratings = data.filter((rating) => !Number.isNaN(rating));
          const sum = ratings.reduce((acc, curr) => acc + curr, 0);
          const averageRating = ratings.length ? sum / ratings.length : 0;
          const starRating = GetStars(averageRating);
          const ratingsCount = countRatings(data);
          setHelpfulReviews(starRating);
          setNumberOfRatings(ratingsCount);
        } else {
          console.error('Data is not an array:', data);
        }
      });
  }, [reviewObj]);
  
  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.photo} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p className="card-text bold">
          <span>Review of the Property: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        {onDashboard && (
          <>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">DELETE</Button>
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>

          </>
        )}
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <>
            <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
              <Button variant="primary" className="m-2">VIEW MORE DETAILS</Button>
            </Link>
            <div>
              Average rating: {helpfulReviews}
              <p className="rating-count">
                {numberOfRatings} people found this helpful.
              </p>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
AuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    photo: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      review: PropTypes.number,
    })),
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func,
};

export default AuthReviewCard;
