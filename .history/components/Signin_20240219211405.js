import React from 'react';
import NoAuthReviewCard from './UnAuthReviewCard';
import NoAuthNavBar from './NoAuthNavBar';

function Signin() {
  const [reviewObj, setReview] = useState([]);
  return (
    <>
      <NoAuthNavBar />
      <div className="d-flex flex-wrap">
        {reviewObj.map((obj) => (
          <NoAuthReviewCard key={obj.id} reviewObj={obj} />
        ))}
      </div>
    </>
  );
}

export default Signin;
