import { useState, useEffect } from 'react';
import star from '../assets/star-selected'; 
import unstar from '../assets/star-unselected';
import _ from 'lodash';
import './styles.css';

function RatingStars({ initRating, onRatingChanged }) {
  const [rating, setRating] = useState(initRating);

  useEffect(() => {
    setRating(initRating);
  }, [initRating]);

  function changeRating(newRating) {
    setRating(newRating);
    onRatingChanged(newRating);
  }

  return (
    <div>
{_.times(5, (index) => (
  <button
    key={index}
    onClick={() => changeRating(index + 1)}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        changeRating(index + 1);
      }
    }}
  >
    <img
      alt="rating stars"
      src={rating >= index + 1 ? star : unstar}
    />
  </button>
  </div>
))}

  )

export default RatingStars;
