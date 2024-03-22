import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext.js';
import checkIfRatingExists from './checkIfRatingExists.js';
import {
  createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating,
} from '../api/reviewData.js';

const WasThisReviewHelpful = ({ firebaseKey, reviews, initialKey }) => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const [review, setReview] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if (user) {
      setUid(user.uid);
      const checkRating = async () => {
        const exists = await checkIfRatingExists(firebaseKey, user.uid);
        console.warn('Rating Exists on page load:', exists);
      };
      checkRating();
    }
  }, [user, firebaseKey]);

  const handleRating = async (reviewId, newRating) => {
    const ratingExists = await checkIfRatingExists(reviewId, uid);

    if (ratingExists) {
      // If a rating exists for the current user, update it
      // await updateWasThisHelpfulReviewRating({ reviewId, uid, rating: newRating });
    } else {
      // If no rating exists for the current user, create a new one
      await createWasThisHelpfulReviewRating({ uid, rating: newRating });
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
    }),
  ),
  firebaseKey: PropTypes.string,
  initialKey: PropTypes.string,
};

WasThisReviewHelpful.defaultProps = {
  reviews: [],
  firebaseKey: '',
  initialKey: '',
};

export default WasThisReviewHelpful;
