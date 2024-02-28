import { getSingleReview } from "./reviewData";
const viewBookDetails = (FirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(bookFirebaseKey)
    .then((bookObject) => {
      getSingleReview(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});
