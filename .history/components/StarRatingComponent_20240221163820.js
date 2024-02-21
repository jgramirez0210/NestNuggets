import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => (
  <div> 
    {[...Array(5)].map((star, i) => (
      const ratingValue= i + 1

      <label>
        <input type="radio" name="rating" />
        <FaStar className="star" size={40} />
      </label>
    ))}
  </div>
);

export default StarRating;
