import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => (
  <div> 
    {[...Array(5)].map(star => (
      <label>
        <input type="radio" name="rating" />
        <FaStar className size={40} />
      </label>
    ))}
  </div>
);

export default StarRating;
