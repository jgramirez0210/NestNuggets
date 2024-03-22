import firebase from 'firebase/app';
import 'firebase/database';

export const checkIfRatingExists = async (initialFirebaseKey, uid) => {
  let ratingExists = false;
  const snapshot = await firebase.database().ref('wasThisReviewHelpful').once('value');
  const data = snapshot.val();

  console.warn('Data from Firebase:', data); // Log the data from Firebase

  if (data) {
    Object.keys(data).forEach((key) => {
      console.warn('Current uid:', data[key].uid); // Log the current uid
      if (data[key].reviewId === initialFirebaseKey && data[key].uid === uid) {
        ratingExists = true;
      }
    });
  }

  console.warn('Rating exists:', ratingExists); // Log whether a rating exists

  return ratingExists;
};

export default checkIfRatingExists;
