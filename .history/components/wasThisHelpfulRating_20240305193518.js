import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import GetStars from './GetStars';
import { getWasThisHelpfulReviewById } from '../api/reviewData';
import ReviewHelpfulRating from './WasThisHelpfulComponent';

const WasThisHelpfulRating = ({ wasThisHelpfulRating }) => {
  const [reviewRatingObj, setReviewRatingObj] = useState([]);
const {firebaseKey} = router.query
  useEffect(() => {
    getWasThisHelpfulReviewById(firebaseKey)
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
