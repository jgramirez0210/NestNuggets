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
    ratings.forEach((rating) => {
      if (rating.uid === uid) {
        console.warn('Match found! Rating UID:', rating.uid, 'Input UID:', uid);
        ratingExists = true;
      }
    });
  } else if (typeof ratings === 'object') {
    if (ratings.uid === uid) {
      console.warn('Match found! Rating UID:', ratings.uid, 'Input UID:', uid);
      ratingExists = true;
    }
  }

  console.warn('Rating exists:', ratingExists);
  return ratingExists;
};

export default checkIfRatingExists;
