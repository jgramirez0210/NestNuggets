import { getSingleReview } from './reviewData';

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      resolve(bookObject);
    }).catch((error) => reject(error));
});
export default viewReviewDetails;
