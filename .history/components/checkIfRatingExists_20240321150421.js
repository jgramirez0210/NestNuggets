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
  // Check both reviewId and uid match to consider a rating as existing.
  if (Array.isArray(ratings)) {
    ratingExists = ratings.some((rating => rating.reviewId === reviewId && rating.uid === uid);
  } else if (typeof ratings === 'object' && ratings.uid) {
    ratingExists = ratings.reviewId === reviewId && ratings.uid === uid;
  }

  console.warn('Rating exists:', ratingExists);
  return ratingExists;
};

export default checkIfRatingExists;
