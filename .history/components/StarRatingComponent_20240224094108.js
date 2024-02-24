import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { updateRating } from '../api/reviewData';

const StarRating = (review) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="rating">
      <div className="overview-rating">
        <p>Overview</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  updateRating(review.firebaseKey, newRating);
                }}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};
StarRating.propTypes = {
  review: PropTypes.shape({
    firebaseKey: PropTypes.string,
    // other properties...
  }).isRequired,
};
export default StarRating;
