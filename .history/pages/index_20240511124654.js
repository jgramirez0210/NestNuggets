import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../utils/context/authContext.js';
import AuthReviewCard from '../components/AuthReviewCard.js';
import { getReview } from '../api/reviewData.js';

function Home() {
  const { user } = useAuth();
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    if (user) {
      const getAllTheReviews = () => {
        getReview(user.uid).then(setReview);
      };
      getAllTheReviews();
    }
  }, [user]);

  return (
    <div className="d-flex flex-wrap">
      {reviews.map((review) => (
        <AuthReviewCard
          key={review.firebaseKey}
          firebaseKey={review.firebaseKey}
          reviewObj={review}
          onDashboard={false}
        />
      ))}
    </div>
  );
}

export default Home;
