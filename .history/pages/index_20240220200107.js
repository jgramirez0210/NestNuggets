import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../utils/context/authContext';
import AuthReviewCard from '../components/AuthReviewCard';
import { getReview } from '../api/reviewData';

function Home() {
  const { user } = useAuth();
  const [reviews, setReview] = useState([]);



  useEffect(() => {
    getAllTheReviews();
  }, [getAllTheReviews]);

  return (
    <div className="d-flex flex-wrap">
      {reviews.map((review) => (
        <AuthReviewCard
          key={review.firebaseKey}
          reviewObj={review}
          onDashboard={false}
        />
      ))}
    </div>
  );
}

export default Home;
