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
    console.log('Expected reviewId (firebaseKey):', reviewObj.firebaseKey); // Confirm the key

    getWasThisReviewHelpful(reviewObj.firebaseKey)
      .then((data) => {
        const allRatings = [];
        // Log the entire object to make sure we're seeing the expected structure
        console.log('Data from wasThisReviewHelpful:', data);

        Object.values(data).forEach((reviewGroup) => {
          Object.values(reviewGroup).forEach((reviewDetails) => {
            // Log each review detail to confirm the structure
            console.log('Review details:', reviewDetails);
            // Check if reviewId matches firebaseKey and if rating is a number
            if (reviewDetails.reviewId === reviewObj.firebaseKey && !Number.isNaN(Number(reviewDetails.rating))) {
              allRatings.push(Number(reviewDetails.rating));
            }
          });
        });

        console.log('Collected Ratings:', allRatings); // Check the ratings collected

        // Calculate the average rating if there are ratings collected
        const averageRating = allRatings.length 
          ? allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length
          : 0;

        console.log('Calculated Average Rating:', averageRating); // Verify the average
        setHelpfulReviews(averageRating); // Update the state with the average rating
      })
      .catch((error) => {
        console.error('Error fetching wasThisReviewHelpful data:', error);
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
