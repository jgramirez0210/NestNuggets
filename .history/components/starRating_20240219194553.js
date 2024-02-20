import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Star = ({ selected = false, onSelect = f => f }) => (
  <span
    style={{ cursor: 'pointer', color: selected ? 'orange' : 'gray' }} 
    onClick={onSelect}
    onKeyDown={(event) => {
      if (event.key === 'Enter') {
        onSelect();
      }
    }}
    role="button" 
    tabIndex={0}
  >
    ★
  </span>
);

const StarRating = ({ totalStars = 5, onRating = f => f }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <div>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => {
            setSelectedStars(i + 1);
            onRating(i + 1);
          }}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
};

Star.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
  onRating: PropTypes.func
};

export default StarRating;
