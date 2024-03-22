
// After
import pkg from '../api/reviewData.js';

const { createWasThisHelpfulReviewRating } = pkg;
// Test data
const testData = {
  reviewId: '-Nrcb8NOEHk0E-UpIHcm', // Replace with a real reviewId for testing
  rating: 5, // Replace with a test rating
  uid: 'Mrh1qmhUnBPK5EDOVtQEcLAWuX02', // Replace with a real uid for testing
};

// Call the function with the test data
createWasThisHelpfulReviewRating(testData)
  .then((reviewId) => {
    console.log('New rating created with reviewId:', reviewId);
  })
  .catch((error) => {
    console.error('Error creating rating:', error);
  });
