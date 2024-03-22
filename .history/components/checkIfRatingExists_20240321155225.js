// Import the function to test
import checkIfRatingExists from './checkIfRatingExists.js';

// Mock the getCurrentRating function
jest.mock('../api/reviewData.js', () => ({
  getCurrentRating: jest.fn(),
}));

import { getCurrentRating } from '../api/reviewData.js';

describe('checkIfRatingExists', () => {
  it('should return true if a rating exists', async () => {
    // Arrange
    const reviewId = 'review1';
    const uid = 'user1';
    getCurrentRating.mockResolvedValue([
      { reviewId: 'review1', uid: 'user1' },
    ]);

    // Act
    const result = await checkIfRatingExists(reviewId, uid);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if a rating does not exist', async () => {
    // Arrange
    const reviewId = 'review1';
    const uid = 'user1';
    getCurrentRating.mockResolvedValue([]);

    // Act
    const result = await checkIfRatingExists(reviewId, uid);

    // Assert
    expect(result).toBe(false);
  });
});
