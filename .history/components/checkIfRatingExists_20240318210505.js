import firebase from 'firebase/app';
import 'firebase/database';

const checkIfRatingExists = async (initialFirebaseKey, uid) => {
  const db = firebase.database();
  const ratingsRef = db.ref('wasThisReviewHelpful');

  let ratingExists = false;

  // Get all ratings
  await ratingsRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const ratingData = childSnapshot.val();
      // Check if the rating's reviewId and uid match the given initialFirebaseKey and uid
      if (ratingData.reviewId === initialFirebaseKey && ratingData.uid === uid) {
        ratingExists = true;
        // Stop looping through the ratings
        return true;
      }
      // If the if condition is never true, return false
      return false;
    });
  });

  // Log the value of ratingExists to the console
  console.warn('ratingExists:', ratingExists);

  return ratingExists;
};

export default checkIfRatingExists;
