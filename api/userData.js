import { clientCredentials } from '../utils/client.js';

const endpoint = clientCredentials.databaseURL;

// CREATE/UPDATE USER PROFILE
const updateUserProfile = (userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userProfiles/${userId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET USER PROFILE
const getUserProfile = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userProfiles/${userId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

export {
  updateUserProfile,
  getUserProfile,
};
