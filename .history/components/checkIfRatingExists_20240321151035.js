import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('Input reviewId:', reviewId, 'Input uid:', uid);

  const ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    console.warn('Rating exists:', false);
    return false;
  }

  let ratingExists = false;
  if (Array.isArray(ratings)) {
    // Check both reviewId and uid to determine if the current user has already rated
    ratingExists = ratings.some((rating) => rating.reviewId === reviewId && rating.uid === uid);
  } else if (typeof ratings === 'object' && ratings.uid) {
    // Assuming ratings could also be a single object in some cases
    ratingExists = ratings.reviewId === reviewId && ratings.uid === uid;
  }

  console.warn('Rating exists:', ratingExists);
  return ratingExists;
};
export default checcheckIfRatingExistsk
