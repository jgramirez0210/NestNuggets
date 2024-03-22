import { getCurrentRating } from '../api/reviewData.js';

const checkIfRatingExists = async ({ reviewId, uid }) => {
  let ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    return null;
  }

  // Convert ratings to an array if it's an object
  if (typeof ratings === 'object') {
    ratings = Object.values(ratings);
  }

  let ratingFirebaseKey = null;
  if (Array.isArray(ratings)) {
    // Check both reviewId and uid to determine if the current user has already rated
    const existingRating = ratings.find((rating) => rating.reviewId === reviewId && rating.uid === uid);
    if (existingRating) {
      ratingFirebaseKey = existingRating.firebaseKey;
    }
  }

  return ratingFirebaseKey;
};

export default checkIfRatingExists;
