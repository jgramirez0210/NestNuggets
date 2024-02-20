import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import NoAuthNavBar from './NoAuthNavBar';

function Signin() {
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
