import { useState, useEffect } from 'react';
import _ from 'lodash';
import unstar from './star-unselected.png';
import star from './star-selected.png';
import './styles.css';

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
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <span role="img" aria-label="emoji">
              {ratingValue <= rating ? '⭐' : '★}
            </span>
          </label>
        );
      })}
    </div>
  );
}
