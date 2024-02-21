import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => (
  const [rating, setRating]
  <div> 
    {[...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return (
        <label>
          <input type="radio" name="rating" value={ratingValue} />
          <FaStar className="star" size={40} />
        </label>
      );
    })}
  </div>
);

export default StarRating;
