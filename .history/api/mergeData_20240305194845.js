import { getSingleReview } from './reviewData';

const viewWasThisRatingHelpful = (ratingFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getSingleAuthorsBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      getSingleReview(reviewObject.rating)
        .then((ratingObject) => {
          resolve({ ratingObject, ...reviewObject });
        });
    }).catch((error) => reject(error));
});
export { viewReviewDetails, viewWasThisRatingHelpful };
