import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  if (!ratings) {
    return false;
  }

  if (typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      if (rating.uid === uid && rating.reviewId === reviewId) {
        console.log('Match found! Rating UID:', rating.uid, 'Input UID:', uid);
        ratingExists = true;
      }
    });
  }

  return ratingExists;
};
export default checkIfRatingExists;
