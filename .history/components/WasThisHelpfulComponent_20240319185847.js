import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

import { createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating } from '../api/reviewData';
import checkIfRatingExists from './checkIfRatingExists';

const WasThisReviewHelpful = ({ initialKey, userId }) => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [initialFirebaseKey, setInitialFirebaseKey] = useState(initialKey);
  const [uid, setUid] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();

  const handleRating = async (ratingValue) => {
    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: initialFirebaseKey,
      uid,
    };
useEffect(() => {
  setInitialFirebaseKey(initialKey);
}, [initalKey]);
    const ratingExists = await checkIfRatingExists(initialFirebaseKey, uid);

    if (!ratingExists || !hasRated) {
      await createWasThisHelpfulReviewRating(payload);
      localStorage.setItem(`hasRated-${initialFirebaseKey}-${uid}`, JSON.stringify(true));
    } else {
      if (!initialFirebaseKey) {
        console.error('initialFirebaseKey is undefined');
        return;
      }
      await updateWasThisHelpfulReviewRating(initialFirebaseKey, payload);
    }
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
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setHasRated(false);
          console.warn('Rating has been reset', hasRated);
        }}
      >
        Reset Rating
      </button>
    </div>
);
};

WasThisReviewHelpful.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      reviewId: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
    })
  ),
  firebaseKey: PropTypes.string,
};

WasThisReviewHelpful.defaultProps = {
  reviews: [],
  firebaseKey: '',
};


export default WasThisReviewHelpful;
