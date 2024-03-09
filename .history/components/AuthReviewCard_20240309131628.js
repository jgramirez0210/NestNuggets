import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getWasThisHelpfulReviewById from './WasThisHelpfulComponent';
import { deleteReview, getWasThisReviewHelpful } from '../api/reviewData';

function AuthReviewCard({
  reviewObj, onDashboard, onUpdate,
}) {
  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
  };
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  useEffect(() => {
    console.log('Review ID from reviewObj:', reviewObj.firebaseKey); // Log the reviewId being used
  
    getWasThisReviewHelpful(reviewObj.firebaseKey)
      .then((data) => {
        console.log('Received data:', data); // Log the received data
  
        const allRatings = [];
        Object.values(data).forEach((reviewGroup) => {
          Object.values(reviewGroup).forEach((detail) => {
            console.log('Detail Review ID:', detail.reviewId, 'Provided Review ID:', reviewObj.firebaseKey);
            if (detail.reviewId === reviewObj.firebaseKey) {
              allRatings.push(parseFloat(detail.rating));
            }
          });
        });
  
        console.log('All Ratings:', allRatings); // Log the all ratings found
  
        const ratings = allRatings.filter(rating => !isNaN(rating));
        console.log('Flat ratings:', ratings); // Log the flat ratings
  
        const sum = ratings.reduce((a, b) => a + b, 0);
        const avg = ratings.length > 0 ? sum / ratings.length : 0;
        console.log('Average rating:', avg); // Log the calculated average
  
        setHelpfulReviews(avg);
      })
      .catch((error) => {
        console.error('Error:', error);
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
            <p>
              Average rating: {helpfulReviews}
            </p>
          </>
        )}
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW MORE DETAILS</Button>
          </Link>
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
