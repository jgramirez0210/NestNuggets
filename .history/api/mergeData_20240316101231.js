import { getSingleReview } from './reviewData'; // Import the function to get single review

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      if (reviewObject) {
        resolve({ ...reviewObject });
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export default viewReviewDetails;
