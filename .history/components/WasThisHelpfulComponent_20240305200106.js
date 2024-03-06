import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { createWasThisHelpfulReviewRating } from '../api/reviewData';

const WasThisReviewHelpful = ({ firebaseKey: initialFirebaseKey, reviews = [] }) => {
  const [firebaseKey, setFirebaseKey] = useState(initialFirebaseKey);
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (firebaseKey && helpfulRating) {
      createWasThisHelpfulReviewRating(firebaseKey, helpfulRating);
    }
  }, [firebaseKey, helpfulRating]);

  const handleRating = (ratingValue) => {
    console.log('ratingValue:', ratingValue);
    setHelpfulRating(ratingValue);
    if (reviews) {
      reviews.forEach((review) => {
        if (review.category === 'helpful') {
          setFirebaseKey(review.firebaseKey);
          const payload = {
            rating: number(ratingValue),
            firebaseKey: review.firebaseKey,
            reviewId: review,
          };
          createWasThisHelpfulReviewRating(review.firebaseKey, ratingValue);
        }
      });
    }
  };
  return (
    <div className="helpful-rating">
      <p>Was this helpful?</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          /* eslint-disable jsx-a11y/label-has-associated-control */
          <label>
            <input
              type="radio"
              id={`helpfulRating-${ratingValue}`}
              name="helpfulRating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (helpfulHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setHelpfulHover(ratingValue)}
              onMouseLeave={() => setHelpfulHover(null)}
            />
          </label>
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
