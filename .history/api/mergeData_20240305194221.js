import { getSingleAuthorsBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSing, deleteBook, getBooksByAuthor } from './bookData';

const viewWasThisRatingHelpful = (ratingFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
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
