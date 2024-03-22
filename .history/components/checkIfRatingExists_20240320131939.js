import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {

  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  if (ratings && typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      console.warn('Current object:', rating);
      if (rating.uid === uid) {
        ratingExists = true;
      }
    });
  }

  console.warn('Rating exists:', ratingExists);

  return ratingExists;
};

export default checkIfRatingExists;
