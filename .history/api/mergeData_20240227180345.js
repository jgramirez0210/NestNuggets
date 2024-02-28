import { getSingleReview } from './reviewData';

const viewReviewDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(bookFirebaseKey)
    .then((bookObject) => {
      resolve(bookObject);
    }).catch((error) => reject(error));
});
