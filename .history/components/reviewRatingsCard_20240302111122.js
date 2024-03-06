import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { deleteReview } from '../api/reviewData';

function ReviewRatingCard({
  reviewObj, onDashboard, onUpdate, reviewRatingObj,
}) {
  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
    reviewRatingObj: {},
  };

  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.photo} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        {/* Access and display the ratings here */}
        <span>User Ratings: </span>
        {reviewRatingObj && reviewRatingObj.reviewRating && (
          <>
            <span>Overall: {GetStars(reviewRatingObj.reviewRating.overall)}</span><br />
            <span>Management: {GetStars(reviewRatingObj.reviewRating.management)}</span><br />
            <span>Safety: {GetStars(reviewRatingObj.reviewRating.safety)}</span>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
ReviewRatingCard.propTypes = {
  reviewObj: PropTypes.shape({
    photo: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func,
  reviewRatingObj: PropTypes.shape({
    reviewRating: PropTypes.shape({
      overall: PropTypes.number,
      management: PropTypes.number,
      safety: PropTypes.number,
    }),
  }),
};

export default ReviewRatingCard;
