import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Star = ({ selected = false, onSelect = (f) => f }) => (
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

const StarRating = ({ totalStars = 5, onRating = (f) => f, identifiers }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <div>
      {identifiers.map((id, i) => (
        <Star
          key={id}
          selected={selectedStars > i}
          onSelect={() => {
            setSelectedStars(i + 1);
            onRating(i + 1);
          }}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
  onRating: PropTypes.func,
  identifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StarRating;
