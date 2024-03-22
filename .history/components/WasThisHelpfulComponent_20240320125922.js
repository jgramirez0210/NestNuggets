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
        setUid(user.uid); // Set uid to user.uid
        const exists = await checkIfRatingExists('some-review-id', user.uid);
        setRatingExists(exists);
      }
    };

    checkRating();
  }, [user]);

  const handleRating = async (ratingValue) => {
    if (!uid) {
      console.warn('UID is not set yet');
      return;
    }

    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: firebaseKey,
      uid,
    };

    // Use 'setRatingExists' to update the 'ratingExists' state
    const doesRatingExist = await checkIfRatingExists(firebaseKey, uid);
    setRatingExists(doesRatingExist);
    console.warn(`firebase${firebaseKey} and uid: ${uid} is`, doesRatingExist);

    if (doesRatingExist) {
      // If a rating exists, update it
      await updateWasThisHelpfulReviewRating(payload);
      // console.warn('update rating with payload', payload);
    } else {
      // If no rating exists, create a new one
      const newRatingRef = await createWasThisHelpfulReviewRating(payload);
      console.log('New rating created with ID:', newRatingRef.id);
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
