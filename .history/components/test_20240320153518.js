import checkIfRatingExists from './checkIfRatingExists';
import { getCurrentRating } from '../api/reviewData';

// Mock the getCurrentRating function
jest.mock('../api/reviewData', () => ({
  getCurrentRating: jest.fn(),
}));

describe('checkIfRatingExists', () => {
  it('returns false if there are no ratings', async () => {
    getCurrentRating.mockResolvedValue(null);
    const result = await checkIfRatingExists('some-review-id', 'some-uid');
    expect(result).toBe(false);
  });

  it('returns false if the user has not rated the review', async () => {
    getCurrentRating.mockResolvedValue({
      'some-other-uid': { uid: 'some-other-uid', rating: 5 },
    });
    const result = await checkIfRatingExists('some-review-id', 'some-uid');
    expect(result).toBe(false);
  });

  it('returns true if the user has rated the review', async () => {
    getCurrentRating.mockResolvedValue({
      'some-uid': { uid: 'some-uid', rating: 5 },
    });
    const result = await checkIfRatingExists('some-review-id', 'some-uid');
    expect(result).toBe(true);
  });
});
