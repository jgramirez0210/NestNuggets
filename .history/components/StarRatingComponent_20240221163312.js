import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  return (
    <div> 
      {[...Array(5)].map(star => {
        return 
        <label>
          <input type='radio' name
          <FaStar size={40} />
        </label>
      })}
    </div>
  );
    }

export default StarRating;
