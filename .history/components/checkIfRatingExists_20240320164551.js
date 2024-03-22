import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  console.log('Ratings:', ratings); // Log the ratings object

  if (!ratings) {
    console.warn('No ratings for this review ID');
    return false;
  }

  if (typeof ratings === 'object') {
    // Get the first (and only) property of the ratings object
    const ratingsObject = Object.values(ratings)[0];

    if (typeof ratingsObject === 'object') {
      Object.values(ratingsObject).forEach((rating) => {
        console.log('Rating UIDs:', rating.uid); // Log the uid of each rating
        if (rating.uid === uid) {
          ratingExists = true;
        }
      });
    }
  }

  console.warn('Output of checkIfRatingExists:', ratingExists); // Log the output

  return ratingExists;
};

export default checkIfRatingExists;
