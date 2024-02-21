import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { StaticLabelLabel } from 'react-bootstrap';

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      <p>Overview</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <StaticLabel>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}

            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </StaticLabel>
        );
      })}
    </div>
  );
};

export default StarRating;
