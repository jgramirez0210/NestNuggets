import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  console.warn('UID passed to function:', uid);

  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  console.warn('Data from getCurrentRating:', ratings);

  // If there's no reviewId returned from getCurrentRating, return false
  if (!ratings) {
    console.warn('No ratings for this review ID');
    return false;
  }

  if (typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      console.warn('Current object:', rating);
      if (rating.uid === uid) {
        ratingExists = true;
      }
    });
  }

  return ratingExists;
};

export default checkIfRatingExists;
