import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { updateRating } from '../api/reviewData';

const initialState = {
  firebaseKey: null,
  category: null,
  overviewRating: null,
  overviewHover: null,
  safetyRating: null,
  safetyHover: null,
  managementRating: null,
  managementHover: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setFirebaseKey':
      return { ...state, firebaseKey: action.payload };
    case 'setCategory':
      return { ...state, category: action.payload };
    case 'setOverviewRating':
      return { ...state, overviewRating: action.payload };
    case 'setSafetyRating':
      return { ...state, safetyRating: action.payload };
    case 'setManagementRating':
      return { ...state, managementRating: action.payload };
    default:
      return state;
  }
}
const StarRating = ({ reviews }) => {
  const [firebaseKey, setFirebaseKey] = useState(null);
  const [category, setCategory] = useState(null);
  const [overviewRating, setOverviewRating] = useState(null);
  const [overviewHover, setOverviewHover] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const [safetyHover, setSafetyHover] = useState(null);
  const [managementRating, setManagementRating] = useState(null);
  const [managementHover, setManagementHover] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.firebaseKey) {
      updateRating(state.firebaseKey, state.overviewRating, state.safetyRating, state.managementRating)
        .then(() => console.log('Rating updated successfully'))
        .catch((error) => console.error(error));
    }
  }, [state]);

  const handleRating = (value, newCategory) => {
    dispatch({ type: 'setCategory', payload: newCategory });

    switch (newCategory) {
      case 'overview':
        dispatch({ type: 'setOverviewRating', payload: value });
        break;
      case 'safety':
        dispatch({ type: 'setSafetyRating', payload: value });
        break;
      case 'management':
        dispatch({ type: 'setManagementRating', payload: value });
        break;
      default:
        break;
    }

    reviews.forEach((review) => {
      if (review.category === newCategory) {
        dispatch({ type: 'setFirebaseKey', payload: review.firebaseKey });
      }
    });
  };
  return (
    <div className="rating">
      <div className="overview-rating">
        <p>Overall Review</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            /* eslint-disable jsx-a11y/label-has-associated-control */
            <label>
              <input
                type="radio"
                id={`overviewRating-${ratingValue}`}
                name="overviewRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'overview')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (overviewHover || overviewRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setOverviewHover(ratingValue)}
                onMouseLeave={() => setOverviewHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="safety-rating">
        <p>Safety Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            /* eslint-disable jsx-a11y/label-has-associated-control */
            <label>
              <input
                type="radio"
                id={`safetyRating-${ratingValue}`}
                name="safetyRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'safety')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (safetyHover || safetyRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setSafetyHover(ratingValue)}
                onMouseLeave={() => setSafetyHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="management-rating">
        <p>Management Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                id={`managementRating-${ratingValue}`}
                name="managementRating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'management')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (managementHover || managementRating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setManagementHover(ratingValue)}
                onMouseLeave={() => setManagementHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      overview: PropTypes.number,
      safety: PropTypes.number,
      management: PropTypes.number,
    }),
  ).isRequired,
};
export default StarRating;
