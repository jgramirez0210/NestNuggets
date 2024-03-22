import { clientCredentials } from '../utils/client';

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
const createWasThisHelpfulReviewRating = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${payload.reviewId}/.json`, {
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

// UPDATE WAS THIS RATING HELPFUL
const updateWasThisHelpfulReviewRating = (reviewId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${reviewId}.json`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});
// GET WAS THIS REVIEW HELPFUL
const getWasThisHelpfulReviewRating = (payload) => new Promise((resolve, reject) => {
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
    .then(resolve)
    .catch(reject);
});
// GET ALL RATINGS
const getCurrentRating = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${payload.reviewId}.json?`, {
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
    .then(resolve)
    .catch(reject);
});
// Make sure to call the function with a valid reviewId
getWasThisHelpfulReviewRating('some-review-id');

export {
  getReview, createReview, updateReview, getReviewByUser, deleteReview, getSingleReview, createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating, getWasThisHelpfulReviewRating,
  getCurrentRating,
};
