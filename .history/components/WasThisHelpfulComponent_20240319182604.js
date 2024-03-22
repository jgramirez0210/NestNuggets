import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes, { number } from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating } from '../api/reviewData';
import checkIfRatingExists from './checkIfRatingExists';

const WasThisReviewHelpful = () => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [initialFirebaseKey, setInitialFirebaseKey] = useState(null);
  const [uid, setUid] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = async (ratingValue, reviewId) => {
    const payload = {
      rating: ratingValue,
      reviewId: reviewId,
      uid
    }
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

  useEffect(() => {
    const fetchRating = async () => {
      const ratingExists = await checkIfRatingExists(initialFirebaseKey, uid);
      console.warn('RatingExists:!!!!', ratingExists);
    };

    if (initialFirebaseKey && uid) {
      fetchRating();
    }

    const storedHasRated = localStorage.getItem(`hasRated-${initialFirebaseKey}-${uid}`);
    const hasRatedFromStorage = storedHasRated ? JSON.parse(storedHasRated) : false;

    setHasRated(hasRatedFromStorage);
  }, [initialFirebaseKey, uid]);


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
