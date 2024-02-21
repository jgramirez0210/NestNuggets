import { useState, useEffect } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import star from '../assets/star-selected.png'
import unstar from '../assets/star-unselected.png';

function RatingStars({ initRating, onRatingChanged }) {
  const [rating, setRating] = useState(initRating);

  useEffect(() => {
    // if prop changed, we want to reflect that.
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
          type="button"
          key={index}
          onClick={() => changeRating(index + 1)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              changeRating(index + 1);
            }
          }}
        >
          <Image
            alt="rating stars"
            src={rating >= index + 1 ? star : unstar}
            width={32} // replace with your actual image width
            height={32} // replace with your actual image height
          />
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
