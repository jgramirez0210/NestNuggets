import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import AuthReviewCard from '../components/AuthReviewCard';
import { getReview } from '../api/reviewData';

function Home() {
  const { user } = useAuth();
  const [reviewObj, setReview] = useState([]);

  const getAllTheReviews = () => {
    getReview(user.uid).then(setReview);
  };

  useEffect(() => {
    getAllTheReviews();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {reviewObj.map((obj) => {
        const newObj = {...obj };
        newObj.rating.management = String(newObj.rating.management);
        return <AuthReviewCard key={newObj.firebaseKey} reviewObj={newObj} />
      })}
    </div>
  );
}

export default Home;
