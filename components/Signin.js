import React, { useEffect, useState } from 'react';
import NoAuthReviewCard from './NoAuthReviewCard.js';
import NoAuthNavBar from './NoAuthNavBar.js';
import { getReview } from '../api/reviewData.js';

function Signin() {
  const [reviewObj, setReview] = useState([]);
  const getAllTheReviews = () => {
    getReview().then(setReview);
  };

  useEffect(() => {
    getAllTheReviews();
  }, []);
  return (
    <>
      <NoAuthNavBar />
      <div className="d-flex flex-wrap">
        {reviewObj.map((review) => (
          <NoAuthReviewCard key={review.firebaseKey} reviewObj={review} />
        ))}
      </div>
    </>
  );
}

export default Signin;
