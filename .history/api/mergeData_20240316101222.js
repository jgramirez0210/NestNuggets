import { getSingleReview } from './reviewData'; // Import the function to get single review

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      if (reviewObject) { // Check if reviewObject is not null
        resolve({ ...reviewObject });
      }
    })
    .catch((error) => {
      console.error('Error getting single review:', error);
      reject(error);
    });
});

export default viewReviewDetails;
