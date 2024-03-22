import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('Input reviewId:', reviewId, 'Input uid:', uid);

  const ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    return null;
  }

  return ratings;
};
export default checkIfRatingExists;
