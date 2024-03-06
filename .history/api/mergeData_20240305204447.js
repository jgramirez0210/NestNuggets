import { getSingleReview } from './reviewData';

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      getSingleReview(reviewObject.rating)
        .then((ratingObject) => {
          resolve({ ratingObject, ...reviewObject });
        });
    }).catch((error) => reject(error));
});
export { viewReviewDetails
