import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('Input reviewId:', reviewId, 'Input uid:', uid);

  const ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    console.warn('Ratings exist:', false);
    return null;
  }

  console.warn('Ratings exist:', true);
  return ratings;
};
export default checkIfRatingExists;
