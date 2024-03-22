import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {

  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  console.warn('Data from getCurrentRating:', ratings);

  if (ratings && typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      if (rating.uid === uid) {
        ratingExists = true;
      }
    });
  }

  return ratingExists;
};

export default checkIfRatingExists;
