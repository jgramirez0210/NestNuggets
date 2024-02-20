import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import AuthReviewCard from '../components/AuthReviewCard';
import { getReview } from '../api/reviewData';

function Home() {
  const { user } = useAuth();
  const [reviewObj, setReview] = useState([]);

  const getAllTheReviews = useCallback(() => {
    getReview(user.uid).then(setReview);
  }, [user.uid]);
  
  useEffect(() => {
    getAllTheReviews();
  }, [getAllTheReviews]);

  return (
    <div className="d-flex flex-wrap">
      {reviewObj.map((obj) => (
        <AuthReviewCard key={obj.id} reviewObj={obj} />
      ))}
    </div>
  );
}

export default Home;
