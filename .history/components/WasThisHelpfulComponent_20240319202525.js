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
  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);

  const handleRating = async (ratingValue) => {
    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: firebaseKey,
      uid,
    };

    const ratingExists = await checkIfRatingExists(firebaseKey, uid);

    // Log the result of checkIfRatingExists
    console.log(`Does rating exist for firebaseKey ${firebaseKey} and uid ${uid}?`, ratingExists);

    if (!ratingExists || !hasRated) {
      const response = await createWasThisHelpfulReviewRating(payload);
      localStorage.setItem(`hasRated-${firebaseKey}-${uid}`, JSON.stringify(true));
    } else if (!firebaseKey) {
      console.error('initialFirebaseKey is undefined');
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
