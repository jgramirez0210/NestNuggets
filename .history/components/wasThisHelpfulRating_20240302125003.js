import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { getReviewById } from '../api/reviewData';
import WasThisReviewHelpful from './WasThisReviewHelpfulComponent';

const WasThisReviewHelpful = ({ reviews = [] }) => {
  const [reviewRatingObj, setReviewRatingObj] = useState(null);

  useEffect(() => {
    getReviewById(wasThisHelpfulRating)
      .then((data) => {
        setReviewRatingObj(data);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
      });
  }, [wasThisHelpfulRating]);

  return (
    <Card>
      <Card.Body>
        {/* Access and display the ratings here */}
        {wasThisHelpfulRating && wasThisHelpfulRating.rating && (
          <>
            <span>Was this Helpful?: {GetStars(wasThisHelpfulRating.rating)}</span><br />
          </>
        )}
        <WasThisReviewHelpful /> {/* use the component */}
      </Card.Body>
    </Card>
  );
};

WasThisHelpfulRating.propTypes = {
  wasThisHelpfulRating: PropTypes.string.isRequired,
};

export default WasThisHelpfulRating;
