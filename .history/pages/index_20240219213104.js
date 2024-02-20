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
      {reviewObj.map((obj) => (
        <AuthReviewCard key={uuidv4()} reviewObj={obj} />
      ))}
    </div>
  );
}

export default Home;
