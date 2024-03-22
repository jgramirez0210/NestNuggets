import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from '../api/reviewData';

const checkIfRatingExists = async (reviewId, uid) => {
  let ratingExists = false;
  const ratings = await getCurrentRating({ reviewId });

  console.log('Ratings:', ratings); // Log the ratings object

  if (!ratings) {
    console.warn('No ratings for this review ID', reviewId);
    return false;
  }

  if (typeof ratings === 'object') {
    // Get the ratings for the reviewId
    const ratingsForReviewId = ratings[reviewId];

    if (typeof ratingsForReviewId === 'object') {
      Object.values(ratingsForReviewId).forEach((rating) => {
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
