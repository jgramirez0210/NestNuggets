import React from 'react';
import firebase from 'firebase/app';
import { useAuth } from '../../utils/context/authContext';
import 'firebase/auth';
import { getReview } from '../../api/reviewData';

export default function ViewUserDetails() {
  const { user } = useAuth();
  const getAllTheBooks = () => {
    getReview(user.uid).then(setReview);
  };
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.photoURL} alt="Profile" />
        </p>
        <p>
          User&apos;s email: {user?.email}
        </p>
        <p>
          User&apos;s name: {user.displayName}
        </p>
        <button type="button" onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </div>
      <div className="d-flex flex-wrap">
        {reviewObj.map((review) => (
          <AuthReviewCard
            key={review.firebaseKey}
            reviewObj={review}
            onUpdate={getAllTheBooks}
          />
        ))}
      </div>
    </div>
  );
}
