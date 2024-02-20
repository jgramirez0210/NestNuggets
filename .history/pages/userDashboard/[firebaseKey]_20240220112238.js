import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useAuth } from '../../utils/context/authContext';
import 'firebase/auth';
import { getReview } from '../../api/reviewData';
import AuthReviewCard from '../../components/AuthReviewCard';

export default function ViewUserDetails() {
  const [reviews, setReview] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getReview(user.uid).then((fetchedReviews) => {
      console.warn('Reviews:', fetchedReviews);
      setReview(fetchedReviews);
    }).catch((error) => {
      console.error('Error fetching reviews:', error);
    });
  }, [user.uid]); // `user.uid` as dependency

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
        {reviews.map((review) => (
          <AuthReviewCard
            key={review.firebaseKey}
            reviewObj={review}
            onUpdate={getReview}
          />
        ))}
      </div>
    </div>
  );
}
