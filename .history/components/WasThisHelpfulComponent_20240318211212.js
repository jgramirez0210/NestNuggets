import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes, { number } from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating } from '../api/reviewData';
import checkIfRatingExists from './checkIfRatingExists';

const WasThisReviewHelpful = ({firebaseKey, firebaseKey: initialFirebaseKey, reviews = [] }) => {
  const [helpfulRating, setHelpfulRating] = useState(null);
  const [helpfulHover, setHelpfulHover] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { user } = useAuth();
  const uid = user ? user.uid : null;

  const handleRating = async (ratingValue) => {
    console.warn('handleRating called with:', ratingValue);

    setHelpfulRating(ratingValue);
    const payload = {
      rating: ratingValue,
      reviewId: initialFirebaseKey,
      uid,
    };
    console.log('Payload:', payload);
    if (!initialFirebaseKey || !uid) {
      console.error('initialFirebaseKey or uid is undefined');
      return;
    }

    // Get hasRated from localStorage
    const storedHasRated = localStorage.getItem(`hasRated-${initialFirebaseKey}-${uid}`);
    const hasRatedFromStorage = storedHasRated ? JSON.parse(storedHasRated) : false;

    // Check if a rating exists in the database
    const ratingExists = await checkIfRatingExists(initialFirebaseKey, uid);

    if (!ratingExists) {
      // No rating exists, create a new one
      await createWasThisHelpfulReviewRating(payload);
      // Set hasRated to true in localStorage after creating a new rating
      localStorage.setItem(`hasRated-${initialFirebaseKey}-${uid}`, JSON.stringify(true));
    } else if (hasRatedFromStorage) {
      // A rating exists and user has already rated this review, update their rating
      if (!initialFirebaseKey) {
        console.error('initialFirebaseKey is undefined');
        return;
      }
      await updateWasThisHelpfulReviewRating(initialFirebaseKey, payload);
    }
    console.warn('UID', uid);
    console.warn('Has Rated from localStorage:', hasRatedFromStorage);
  };
  useEffect(() => {
    const fetchRating = async () => {
      const ratingExists = await checkIfRatingExists(initialFirebaseKey, uid);
      console.warn('RatingExists:!!!!', ratingExists);
    };
    if (initialFirebaseKey && uid) {
      fetchRating();
    }
    // Get hasRated from localStorage
    const storedHasRated = localStorage.getItem(`hasRated-${initialFirebaseKey}-${uid}`);
    const hasRatedFromStorage = storedHasRated ? JSON.parse(storedHasRated) : false;

    // Set the hasRated state
    setHasRated(hasRatedFromStorage);
  }, [initialFirebaseKey, uid]); // Add uid and initialFirebaseKey to the dependency array

  return (
    <div className="helpful-rating" style={{ display: 'flex', flexDirection: 'row' }}>
      <p>Was this helpful?</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        const inputId = `helpfulRating-${ratingValue}`;
        return (
          <div className="wasThisHelpful" key={inputId}>
            <input
              type="radio"
              id={inputId}
              name="helpfulRating"
              value={ratingValue}
            />
            <FaStar
              className="star"
              color={ratingValue <= (helpfulHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
              size={40}
              onMouseEnter={() => setHelpfulHover(ratingValue)}
              onMouseLeave={() => setHelpfulHover(null)}
              onClick={() => {
                handleRating(ratingValue);
              }}
            />
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setHasRated(false);
          console.warn('Rating has been reset', hasRated);
        }}
      >
        Reset Rating
      </button>
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
