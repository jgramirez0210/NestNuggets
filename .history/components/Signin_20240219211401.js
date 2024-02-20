import React from 'react';
import No
import NoAuthNavBar from './NoAuthNavBar';

function Signin() {
  const [reviewObj, setReview] = useState([]);
  return (
    <>
      <NoAuthNavBar />
      <div className="d-flex flex-wrap">
        {reviewObj.map((obj) => (
          <AuthReviewCard key={obj.id} reviewObj={obj} />
        ))}
      </div>
    </>
  );
}

export default Signin;
