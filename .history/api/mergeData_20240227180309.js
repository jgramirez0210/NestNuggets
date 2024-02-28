import { getSingleReview } from './reviewData';

const viewReviewDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(bookFirebaseKey)
    .then((bookObject) => {
      getSingleReview(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});
