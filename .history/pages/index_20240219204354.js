import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import AuthReviewCard from '../components/AuthReviewCard';
import { getReview } from '../api/reviewData';

function Home() {
  const { user } = useAuth();
  const [review, setReview] = useState([]);

  const getAllTheReviews = () => {
    getReview(user.uid).then(setReview);
  };

  useEffect(() => {
    getAllTheReviews();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {review.map(() => (
        <AuthReviewCard
          key={review.firebaseKey}
          reviewObj={review}
          onUpdate={getAllTheReviews}
        />
      ))}
    </div>
  );
}

export default Home;
