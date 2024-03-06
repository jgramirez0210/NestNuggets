import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { getReviewById } from '../api/reviewData';

const WasThisHelpfulRating = ({ wasThisHelpfulRating }) => {
  const [reviewRatingObj, setReviewRatingObj] = useState(null);

  useEffect(() => {
    getReviewById(wasThisHelpfulRating)
      .then((data) => {
        setReviewRatingObj(data);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
      });
  }, [revwasThisHelpfulRatingiewId]);

  return (
    <Card>
      <Card.Body>
        {/* Access and display the ratings here */}
        <span>Was this review helpful?</span>
        {wasThisHelpfulRating && wasThisHelpfulRating.rating && (
          <>
            <span>Was this Helpful?: {GetStars(wasThisHelpfulRating.rating)}</span><br />
            <span>Management: {GetStars(reviewRatingObj.reviewRating.management)}</span><br />
            <span>Safety: {GetStars(reviewRatingObj.reviewRating.safety)}</span>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

WasThisHelpfulRating.propTypes = {
  reviewId: PropTypes.string.isRequired,
};

export default WasThisHelpfulRating;
