import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import {
  createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating,
} from '../api/reviewData';
import checkIf

const WasThisReviewHelpful = ({ firebaseKey, reviews, initialKey }) => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [uid, setUid] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const [ratingExists, setRatingExists] = useState(false);
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (user) {
      setUid(user.uid);
      const checkRating = async () => {
        const exists = await checkIfRatingExists(firebaseKey, user.uid);
        console.warn('Rating Exists on page load:', exists);
      };
      checkRating();
    }
  }, [user]);

  const handleRating = async (rating) => {
    const exists = await checkIfRatingExists(firebaseKey, uid);
    console.warn('Rating Exists:!!', exists);
    if (exists) {
      // Update existing rating
      updateWasThisHelpfulReviewRating(firebaseKey, { rating, reviewId: firebaseKey, uid });
    } else {
      // Create new rating
      createWasThisHelpfulReviewRating({ rating, reviewId: firebaseKey, uid })
        .then(() => console.warn('Rating created'))
        .catch((error) => console.warn('Error creating rating:', error));
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
