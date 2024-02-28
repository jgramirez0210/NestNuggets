import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { updateRating } from '../api/reviewData';

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
    reviews.forEach((review) => {
      if (review.category === category) {
        setFirebaseKey(review.firebaseKey);
      }
    });
  }, [category, reviews]);

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
    <div className="rating">
      <div className="overview-rating">
        <p>Overall Review</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            /* eslint-disable jsx-a11y/label-has-associated-control */
            <label>
              <input
                type="radio"
                id={`overviewRating-${ratingValue}`}
                name="overviewRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'overview')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (overviewHover || overviewRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setOverviewHover(ratingValue)}
                onMouseLeave={() => setOverviewHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="safety-rating">
        <p>Safety Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            /* eslint-disable jsx-a11y/label-has-associated-control */
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
        })}
      </div>
      <div className="management-rating">
        <p>Management Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                id={`managementRating-${ratingValue}`}
                name="managementRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'management')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (managementHover || managementRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setManagementHover(ratingValue)}
                onMouseLeave={() => setManagementHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

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
