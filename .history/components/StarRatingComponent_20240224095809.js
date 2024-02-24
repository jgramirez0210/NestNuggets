import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateRating } from '../api/reviewData';

const StarRating = ({ reviews }) => {
  const [overviewRating, setOverviewRating] = useState(null);
  const [overviewHover, setOverviewHover] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const [safetyHover, setSafetyHover] = useState(null);
  const [managementRating, setManagementRating] = useState(null);
  const [managementHover, setManagementHover] = useState(null);

  const handleRating = (ratingValue, category) => {
    switch (category) {
      case 'overview':
        setOverviewRating(ratingValue);
        break;
      case 'safety':
        setSafetyRating(ratingValue);
        break;
      case 'management':
        setManagementRating(ratingValue);
        break;
      default:
        break;
    }

    reviews.forEach((review) => {
      if (review.category === category) {
        updateRating(review.firebaseKey, ratingValue, review.category);
      }
    });
  };

  return (
    <div className="ratings">
      <div className="overview-rating">
        <p>Overview Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <Form.Control>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
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
            </Form.Control>
          );
        })}
      </div>
      <div className="overview-rating">
        <p>Overview</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <Form>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
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
            </Form>
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
      category: PropTypes.string,
    }),
  ).isRequired,
};
export default StarRating;
