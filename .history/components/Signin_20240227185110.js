import React, { useEffect, useState } from 'react';
import NoAuthReviewCard from './NoAuthReviewCard';
import NoAuthNavBar from './NoAuthNavBar';
import { getReview } from '../api/reviewData';

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
