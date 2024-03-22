import firebase from 'firebase/app';
import 'firebase/database';

export const checkIfRatingExists = async (initialFirebaseKey, uid) => {
  console.warn('UID passed to function:', uid); // Log the uid passed to the function

  let ratingExists = false;
  const snapshot = await firebase.database().ref('wasThisReviewHelpful').once('value');
  const data = snapshot.val();

  console.warn('Data from Firebase:', data); // Log the data from Firebase

  if (data) {
    Object.keys(data).forEach((key) => {
      console.warn('Current object:', data[key]); // Log the current object
      console.warn('UID from wasThisReviewHelpful:', data[key].uid); // Log the uid from wasThisReviewHelpful
      if (data[key].reviewId === initialFirebaseKey && data[key].uid === uid) {
        ratingExists = true;
      }
    });
  }

  console.warn('Rating exists:', ratingExists); // Log whether a rating exists

  return ratingExists;
};

export default checkIfRatingExists;
