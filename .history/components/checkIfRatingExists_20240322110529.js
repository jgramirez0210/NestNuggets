import { getCurrentRating } from '../api/reviewData.js';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('Input reviewId:', reviewId, 'Input uid:', uid);

  let ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    return false;
  }

  // Convert ratings to an array if it's an object
  if (typeof ratings === 'object') {
    ratings = Object.values(ratings);
  }

  let ratingExists = false;
  if (Array.isArray(ratings)) {
    // Check both reviewId and uid to determine if the current user has already rated
    ratingExists = ratings.some((rating) => rating.reviewId === reviewId && rating.uid === uid);
  }

  return ratingExists;
};

export default checkIfRatingExists;
