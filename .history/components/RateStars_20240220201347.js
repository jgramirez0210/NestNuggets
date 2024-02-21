import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RatingStars({ initRating, onRatingChanged }) {
  const [rating, setRating] = useState(initRating || 0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChanged(rate);
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <span role="img" aria-label="emoji">
              {ratingValue <= rating ? }
            </span>
          </label>
        );
      })}
    </div>
  );
}
RatingStars.propTypes = {
  initRating: PropTypes.number,
  onRatingChanged: PropTypes.func.isRequired
};
