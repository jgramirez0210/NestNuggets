import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { updateRating } from '../api/reviewData';

const StarRating = ({ reviews }) => {

    reviews.forEach((review) => {
      if (review.category === category) {
        updateRating(review.firebaseKey, ratingValue, review.category);
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
                id={`rating-${ratingValue}`}
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
      <div className="safety-rating">
        <p>Safety Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            /* eslint-disable jsx-a11y/label-has-associated-control */
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
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
      <div className="management-rating">
        <p>Management Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
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
      firebaseKey: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
};
export default StarRating;
