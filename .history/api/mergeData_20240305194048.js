import { getSingleAuthorsBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, getBooksByAuthor } from './bookData';

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
      getSingleReview(reviewObject)
        .then((authorObject) => {
          resolve({ authorObject, ...reviewObject });
        });
    }).catch((error) => reject(error));
});
