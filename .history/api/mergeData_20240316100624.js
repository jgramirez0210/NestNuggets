import { getSingleReview } from './reviewData';

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      if (reviewObject) { // Check if reviewObject is not null
        getSingleReview(reviewObject.rating)
          .then((ratingObject) => {
            resolve({ ratingObject, ...reviewObject });
          });
      } else {
        console.error('Review object is null');
      }
    });
    }).catch((error) => reject(error));
});
export default viewReviewDetails;
