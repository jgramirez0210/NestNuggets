import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating } from '../api/reviewData';
import checkIfRatingExists from './checkIfRatingExists';

const WasThisReviewHelpful = ({ firebaseKey, reviews, initialKey }) => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [uid, setUid] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const [ratingExists, setRatingExists] = useState(false);

  useEffect(() => {
    const checkRating = async () => {
      if (user) {
        setUid(user.uid);
        const exists = await checkIfRatingExists(firebaseKey, user.uid);
        console.warn(`Rating exists: ${exists}`);
        setRatingExists(exists); // Set the ratingExists state
      }
    };

    checkRating();
  }, [user, firebaseKey]);
  const handleRating = async (ratingValue) => {
    setHelpfulRating(ratingValue);
     const payload = {
    rating: ratingValue,
    reviewId: firebaseKey,
    uid,
  };

  // Check if the rating exists inside the handleRating function
  const exists = await checkIfRatingExists(firebaseKey, user.uid);

  if (exists) {
    // If a rating already exists, update it
    await updateWasThisHelpfulReviewRating(payload);
  } else {
    // If a rating does not exist, create a new one
    await createWasThisHelpfulReviewRating(payload);
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
