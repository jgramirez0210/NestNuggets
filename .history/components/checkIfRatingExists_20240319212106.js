import firebase from 'firebase/app';
import 'firebase/database';
import { getCurrentRating } from './path_to_getCurrentRating'; // Import getCurrentRating

export const checkIfRatingExists = async (uid) => {
  console.warn('UID passed to function:', uid); // Log the uid passed to the function

  let ratingExists = false;
  const ratings = await getCurrentRating(); // Call getCurrentRating

  console.warn('Data from getCurrentRating:', ratings); // Log the data from getCurrentRating

  if (ratings) {
    ratings.forEach((rating) => {
      console.warn('Current object:', rating); // Log the current object
      if (rating.uid === uid) {
        ratingExists = true;
      }
    });
  }

  console.warn('Rating exists:', ratingExists); // Log whether a rating exists

  return ratingExists;
};

export default checkIfRatingExists;
