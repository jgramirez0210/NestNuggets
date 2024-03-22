import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('Input reviewId:', reviewId, 'Input uid:', uid);

  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  console.warn('Ratings:', ratings);

  if (!ratings) {
    return false;
  }

  if (typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      // console.warn('Processing rating:', rating);
      if (rating.uid === uid && rating.reviewId === reviewId) {
        console.warn('Match found! Rating UID:', rating.uid, 'Input UID:', uid, 'Rating reviewId:', rating.reviewId, 'Input reviewId:', reviewId);
        ratingExists = true;
      }
    });
  }

  return ratingExists;
};
export default checkIfRatingExists;
