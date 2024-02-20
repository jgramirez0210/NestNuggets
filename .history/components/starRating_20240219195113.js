import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ totalStars = 5, onRating = (f) => f, review }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <div>
      {Object.keys(review).map((firebaseKey) => {
        const rating = review[firebaseKey].rating;
        return (
          <div key={firebaseKey}>
            <label>{rating}</label>
            <Star
              selected={selectedStars > rating}
              onSelect={() => {
                setSelectedStars(rating + 1);
                onRating(rating + 1);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
  onRating: PropTypes.func,
  identifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StarRating;
