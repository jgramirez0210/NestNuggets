import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { deleteReview } from '../api/reviewData';

function ReviewRatingCard({
  reviewRatingObj,
}) {
  ReviewRatingCard.defaultProps = {

    reviewRatingObj: {},
  };

  return (
    <Card>
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
  reviewRatingObj: PropTypes.shape({
    reviewRating: PropTypes.shape({
      overall: PropTypes.number,
      management: PropTypes.number,
      safety: PropTypes.number,
    }),
  }),
};

export default ReviewRatingCard;
