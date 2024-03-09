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
  fetch(`${endpoint}/wasThisReviewHelpful/${payload.reviewId}.json`, {
    method: 'POST',
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
const updateWasThisHelpfulReviewRating = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful/${payload.reviewId}.json?uid=${payload.uid}`, {
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
// GET WAS THIS REVIEW HELPFUL
const getWasThisReviewHelpful = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wasThisReviewHelpful.json?orderBy="reviewId"&equalTo="${=(reviewId)}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      console.log('Data from fetch request:', data);
      // We're now going to collect all ratings for the given reviewId.
      const ratings = [];
      // Iterate over the returned data to get the nested values
      Object.entries(data).forEach(([key, value]) => {
        const filteredRatings = Object.values(value)
          .filter((item) => item.reviewId === reviewId)
          .map((item) => item.rating);
        ratings.push(...filteredRatings);
      });
      resolve(ratings);
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
});


export {
  getReview, createReview, updateReview, getReviewByUser, deleteReview, getSingleReview, createWasThisHelpfulReviewRating, updateWasThisHelpfulReviewRating, getWasThisReviewHelpful,
};
