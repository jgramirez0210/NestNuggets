import React, { useState } from 'react';

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((Star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} htmlFor={`rating-${ratingValue}`}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              id={`rating-${ratingValue}`}
              onClick={() => setRating(ratingValue)}
            />
            <Star
              size={10}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              className={
                ratingValue <= (hover || rating) ? "activeStar" : "star"
              }
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
