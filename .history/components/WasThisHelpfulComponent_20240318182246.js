import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes, { number } from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import {
  createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating, getWasThisReviewHelpful, getCurrentRating,
} from '../api/reviewData';

const WasThisReviewHelpful = ({ firebaseKey: initialFirebaseKey, reviews = [] }) => {
  const [firebaseKey, setFirebaseKey] = useState(initialFirebaseKey);
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [value, setValue] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const uid = user ? user.uid : null;

  const handleRating = async (ratingValue) => {
    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: initialFirebaseKey,
      uid,
    };

    console.warn('Payload:', payload); // Log the payload

    // Fetch the current user's rating for the current review
    const existingRating = await getCurrentRating(initialFirebaseKey, uid);

    console.warn('Existing Rating:', existingRating); // Log the existing rating

    if (existingRating) {
      // User has already rated this review, update their rating
      await updateWasThisHelpfulReviewRating(existingRating.id, payload);
    } else {
      // User has not rated this review, create a new rating
      await createWasThisHelpfulReviewRating(payload);
    }

    setHasRated(true);

    console.warn('Has Rated:', hasRated); // Log the hasRated state
  };
  return (
    <div className="helpful-rating" style={{ display: 'flex', flexDirection: 'row' }}>
      <p>Was this helpful?</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            onClick={() => handleRating(ratingValue)}
          >
            {ratingValue <= (hover || helpfulRating) ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
};

WasThisReviewHelpful.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      rating: PropTypes.number,
    }),
  ),
  firebaseKey: PropTypes.string,
};

WasThisReviewHelpful.defaultProps = {
  reviews: [],
  firebaseKey: '',
};

export default WasThisReviewHelpful;
