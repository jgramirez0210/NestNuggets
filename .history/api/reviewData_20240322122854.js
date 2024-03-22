import { clientCredentials } from '../utils/client.js';

const endpoint = clientCredentials.databaseURL;

// GET PROPERTY REVIEWS
const getReview = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
//  GET SINGLE REVIEW
const getSingleReview = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET PROPERTY REVIEWS BY UID
const getReviewByUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// CREATE PROPERTY REVIEW
const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const firebaseKey = data.name;
      const reviewWithKey = { ...payload, firebaseKey };
      return fetch(`${endpoint}/review/${firebaseKey}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewWithKey),
      });
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// UPDATE PROPERTY REVIEW
const updateReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// DELETE PROPERTY REVIEW
const deleteReview = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

// ADD NEW REVIEW RATING
const createWasThisHelpfulReviewRating = ({ reviewId, ...rest }) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${reviewId}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviewId, ...rest }),
  })
    .then((response) => response.json())
    .then((data) => {
      const firebaseKey = data.name;
      const reviewWithKey = { reviewId, firebaseKey, ...rest };
      return fetch(`${endpoint}/wasThisReviewHelpful/${reviewId}/${firebaseKey}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewWithKey),
      });
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
// UPDATE WAS THIS REVIEW HELPFUL
const updateWasThisHelpfulReviewRating = (firebaseKey, newRating) => {
  console.warn('Update firebaseKey:', firebaseKey); // Log the firebaseKey
  return fetch(`${endpoint}/wasThisReviewHelpful/${firebaseKey}/rating.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRating),
  })
    .then((response) => {
      console.warn('Response status:', response.status); // Log the response status
      return response.json();
    })
    .then((data) => {
      console.warn('Response data:', data); // Log the response data
      return data;
    })
    .catch((error) => console.error(error));
};
// GET WAS THIS REVIEW HELPFUL
const getWasThisHelpfulReviewRating = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${reviewId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

// GET CURRENT RATINGS
const getCurrentRating = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${payload.reviewId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

const firebaseKeyExists = async (firebaseKey) => fetch(`${endpoint}/wasThisReviewHelpful/${firebaseKey}.json`)
  .then((response) => response.json())
  .then((data) => !!data);

// Make sure to call the function with a valid reviewId
getWasThisHelpfulReviewRating('some-review-id');

export {
  getReview, createReview, updateReview, getReviewByUser, deleteReview, getSingleReview, createWasThisHelpfulReviewRating,
  getWasThisHelpfulReviewRating, getCurrentRating, updateWasThisHelpfulReviewRating, firebaseKeyExists,
};
