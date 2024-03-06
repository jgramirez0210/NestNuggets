import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { createReviewRating } from '../api/reviewData';

const StarRating = ({ firebaseKey: initialFirebaseKey, reviews }) => {
  const [firebaseKey, setFirebaseKey] = useState(initialFirebaseKey);
  const [category, setCategory] = useState(null);
  const [overviewRating, setOverviewRating] = useState(null);
  const [overviewHover, setOverviewHover] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const [safetyHover, setSafetyHover] = useState(null);
  const [managementRating, setManagementRating] = useState(null);
  const [managementHover, setManagementHover] = useState(null);

  useEffect(() => {
    if (firebaseKey && (overviewRating || safetyRating || managementRating)) {
      createReviewRating(firebaseKey, overviewRating, safetyRating, managementRating);
    }
  }, [firebaseKey, overviewRating, safetyRating, managementRating]);

  const handleRating = (value, newCategory) => {
    setCategory(newCategory);

    switch (newCategory) {
      case 'overview':
        setOverviewRating(value);
        break;
      case 'safety':
        setSafetyRating(value);
        break;
      case 'management':
        setManagementRating(value);
        break;
      default:
        break;
    }

    reviews.forEach((review) => {
      if (review.category === newCategory) {
        setFirebaseKey(review.firebaseKey);
      }
    });
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
              onClick={() => handleRating(ratingValue, 'helpful')}
            />
            <FaStar
              className="star"
              color={ratingValue <= (safetyHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setSafetyHover(ratingValue)}
              onMouseLeave={() => setSafetyHover(null)}
            />
          </label>
        );
      })}
    </div>
      {/* <div className="safety-rating">
        <p>Safety Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                id={`safetyRating-${ratingValue}`}
                name="safetyRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'safety')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (safetyHover || safetyRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setSafetyHover(ratingValue)}
                onMouseLeave={() => setSafetyHover(null)}
              />
            </label>
          );
        })} */}


StarRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      rating: PropTypes.number,
    }),
  ).isRequired,
  firebaseKey: PropTypes.string,
};

StarRating.defaultProps = {
  firebaseKey: '',
};

export default StarRating;
