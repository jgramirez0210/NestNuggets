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
    console.warn('handleRating called with:', ratingValue);
    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: initialFirebaseKey,
      uid,
    };

    console.warn('Payload:', payload); // Log the payload

    if (!initialFirebaseKey || !uid) {
      console.error('initialFirebaseKey or uid is undefined');
      return;
    }

    if (hasRated) {
      // User has already rated this review, update their rating
      await updateWasThisHelpfulReviewRating(initialFirebaseKey, payload);
    } else {
      // User has not rated this review, create a new rating
      await createWasThisHelpfulReviewRating(payload);
      setHasRated(true); // Set hasRated to true after creating a new rating
    }

    console.warn('Has Rated:', hasRated); // Log the hasRated state
  };
  return (
    <div className="helpful-rating" style={{ display: 'flex', flexDirection: 'row' }}>
      <p>Was this helpful?</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        const inputId = `helpfulRating-${ratingValue}`;
        return (
          <div className="wasThisHelpful" key={inputId}>
            <input
              type="radio"
              id={inputId}
              name="helpfulRating"
              value={ratingValue}
            />
            <FaStar
              className="star"
              color={ratingValue <= (helpfulHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setHelpfulHover(ratingValue)}
              onMouseLeave={() => setHelpfulHover(null)}
              onClick={() => {
                handleRating(ratingValue);
              }}
            />
            <div>
              <button onClick={() => setHasRated(false)}>
        Reset Rating
      </button>
    </div>
          </div>
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
