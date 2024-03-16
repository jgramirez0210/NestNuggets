import { getSingleReview } from './reviewData';
import { getRatingDetails } from './ratingData'; // Import the function to get rating details

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      if (reviewObject) { // Check if reviewObject is not null
        getRatingDetails(reviewObject.rating) // Call the function to get rating details
          .then((ratingObject) => {
            resolve({ ratingObject, ...reviewObject });
          });
      } else {
        console.error('Review object is null');
      }
    });
});

export default viewReviewDetails;
