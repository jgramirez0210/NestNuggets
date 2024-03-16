import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes, { number } from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating, getWasThisReviewHelpful } from '../api/reviewData';

const WasThisReviewHelpful = ({ firebaseKey: initialFirebaseKey, reviews = [] }) => {
  const [firebaseKey, setFirebaseKey] = useState(initialFirebaseKey);
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [value, setValue] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const uid = user ? user.uid : null;

  const handleRating = async (ratingValue) => {
    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: initialFirebaseKey,
      uid,
    };

    // Fetch all ratings for the current review
    const ratingsObject = await getWasThisReviewHelpful(initialFirebaseKey);

    // Convert ratings object to array and extract the innermost objects
    const ratings = ratingsObject ? Object.values(ratingsObject).flatMap(Object.values) : [];

    // Check if the current user has already rated this review
    const existingRating = ratings.find((rating) => rating.uid === uid && rating.reviewId === initialFirebaseKey);
    console.warn('ratings', ratings, );

    if (existingRating) {
      // User has already rated this review, update their rating
      await updateWasThisHelpfulReviewRating(existingRating.id, payload);
    } else {
      // User has not rated this review, create a new rating
      await createWasThisHelpfulReviewRating(payload);
    }

    setHasRated(true);
  };

  return (
    <div className="helpful-rating">
      <p>Was this helpful?</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          /* eslint-disable jsx-a11y/label-has-associated-control */
          <label>
            <input
              type="radio"
              id={`helpfulRating-${ratingValue}`}
              name="helpfulRating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (helpfulHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setHelpfulHover(ratingValue)}
              onMouseLeave={() => setHelpfulHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

WasThisReviewHelpful.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      rating: PropTypes.number,
    }),
  ),
  firebaseKey: PropTypes.string,
};

WasThisReviewHelpful.defaultProps = {
  reviews: [],
  firebaseKey: '',
};

export default WasThisReviewHelpful;
