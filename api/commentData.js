import { clientCredentials } from '../utils/client.js';

const endpoint = clientCredentials.databaseURL;

// CREATE COMMENT
const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const firebaseKey = data.name;
      const commentWithKey = { ...payload, firebaseKey };
      return fetch(`${endpoint}/comments/${firebaseKey}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentWithKey),
      });
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET COMMENTS BY REVIEW
const getCommentsByReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json?orderBy="reviewId"&equalTo="${reviewId}"`, {
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

// GET COMMENTS BY USER
const getCommentsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json?orderBy="userId"&equalTo="${userId}"`, {
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

// UPDATE COMMENT
const updateComment = (firebaseKey, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
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

// DELETE COMMENT
const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// ADD LIKE TO COMMENT
const addCommentLike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentLikes/${commentFirebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const likes = data || {};
      likes[userId] = true;
      return fetch(`${endpoint}/commentLikes/${commentFirebaseKey}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likes),
      });
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// REMOVE LIKE FROM COMMENT
const removeCommentLike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentLikes/${commentFirebaseKey}/${userId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// ADD DISLIKE TO COMMENT
const addCommentDislike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentDislikes/${commentFirebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const dislikes = data || {};
      dislikes[userId] = true;
      return fetch(`${endpoint}/commentDislikes/${commentFirebaseKey}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dislikes),
      });
    })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// REMOVE DISLIKE FROM COMMENT
const removeCommentDislike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentDislikes/${commentFirebaseKey}/${userId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET COMMENT LIKES
const getCommentLikes = (commentFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentLikes/${commentFirebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.keys(data).length);
      } else {
        resolve(0);
      }
    })
    .catch(reject);
});

// GET COMMENT DISLIKES
const getCommentDislikes = (commentFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentDislikes/${commentFirebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.keys(data).length);
      } else {
        resolve(0);
      }
    })
    .catch(reject);
});

// CHECK IF USER LIKED COMMENT
const checkUserCommentLike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentLikes/${commentFirebaseKey}/${userId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(!!data))
    .catch(reject);
});

// CHECK IF USER DISLIKED COMMENT
const checkUserCommentDislike = (commentFirebaseKey, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/commentDislikes/${commentFirebaseKey}/${userId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(!!data))
    .catch(reject);
});

export {
  createComment,
  getCommentsByReview,
  getCommentsByUser,
  updateComment,
  deleteComment,
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
  getCommentLikes,
  getCommentDislikes,
  checkUserCommentLike,
  checkUserCommentDislike,
};
