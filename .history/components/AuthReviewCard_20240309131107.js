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
    getWasThisReviewHelpful(reviewObj.firebaseKey)
      .then((data) => {
        // Log the raw data for inspection
        console.log('Raw data:', data);
  
        const nestedRatings = Object.values(data).map((nestedObject) =>
          Object.values(nestedObject).map((item) => parseFloat(item.rating))
        );
        console.log('Nested ratings:', nestedRatings); // Log to check the structure
  
        // Flatten the array of arrays into a single array of ratings
        const ratings = [].concat(...nestedRatings).filter((rating) => !Number.isNaN(rating));
        console.log('Flat ratings:', ratings); // Log to check the values
  
        // Calculate the sum and average
        const sum = ratings.reduce((a, b) => a + b, 0);
        const avg = ratings.length > 0 ? sum / ratings.length : 0;
        console.log('Average rating:', avg); // Log the final average
  
        setHelpfulReviews(avg); // This sets the state to the average, not an array
      })
      .catch((error) => console.error(error));
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
