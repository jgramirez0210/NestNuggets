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
    ratingExists = ratings.some(rating => rating.reviewId === reviewId);
  } else if (typeof ratings === 'object') {
    ratingExists = ratings.reviewId === reviewId;
  }

  console.warn('Rating exists:', ratingExists);
  return ratingExists;
};

export default checkIfRatingExists;
