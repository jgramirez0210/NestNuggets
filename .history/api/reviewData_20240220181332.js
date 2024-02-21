import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET REVIEWS
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

// GET REVIEWS BY UID
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
// CREATE REVIEW
export const createReview = (reviewData) => {
  return fetch(`${endpoint}/review.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => response.json())
    .then((data) => {
      // data.name is the firebaseKey
      return { ...reviewData, firebaseKey: data.name };
    });
};

// UPDATE REVIEW
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

// DELETE REVIEW
const deleteReview = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

//  UPDATE RATING
const updateRating = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${firebaseKey}.rating.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(firebaseKey),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getReview, createReview, updateReview, updateRating, getReviewByUser, deleteReview,
};
