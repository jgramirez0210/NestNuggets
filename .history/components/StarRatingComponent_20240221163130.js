import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => (
  <div> 
    {[...Array(5)].map(star => <lable><FaStar size={40} />)}
  </div>
);

export default StarRating;
