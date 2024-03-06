import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import GetStars from './GetStars';
import { getReviewById } from '../api/reviewData';
import ReviewHelpfulRating from './WasThisHelpfulComponent'; // renamed the imported component

const WasThisHelpfulRating = ({ wasThisHelpfulRating }) => {
  const [reviewRatingObj, setReviewRatingObj] = useState([]); // initialize as an empty array

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
        <ReviewHelpfulRating reviews={reviewRatingObj} /> {/* use the component */}
      </Card.Body>
    </Card>
  );
};

WasThisHelpfulRating.propTypes = {
  wasThisHelpfulRating: PropTypes.string.isRequired,
};

export default WasThisHelpfulRating;
