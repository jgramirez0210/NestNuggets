import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });
  console.log('Ratings:', ratings);

  if (!ratings) {
    console.warn('No ratings for this review ID', reviewId);
    return false;
  }

  if (typeof ratings === 'object') {
    Object.values(ratings).forEach((rating) => {
      console.log('Rating UID:', rating.uid); // Log the uid of each rating
      if (rating.uid === uid && rating.reviewId === reviewId) {
        console.log('Match found! Rating UID:', rating.uid, 'Input UID:', uid);
        ratingExists = true;
      }
    });
  }

  console.warn('Output of checkIfRatingExists:', ratingExists); // Log the output

  return ratingExists;
};
export default checkIfRatingExists;
