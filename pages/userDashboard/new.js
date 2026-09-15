import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import firebase from 'firebase/app';
import { useAuth } from '../../utils/context/authContext.js';
import 'firebase/auth';
import { getReviewByUser, getReview } from '../../api/reviewData.js';
import { getCommentsByUser } from '../../api/commentData.js';
import { getUserProfile } from '../../api/userData.js';
import AuthReviewCard from '../../components/AuthReviewCard.js';

export default function ViewUserDetails() {
  const [reviews, setReview] = useState([]);
  const [commentedReviews, setCommentedReviews] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { user } = useAuth();

  const fetchReviews = useCallback(() => {
    getReviewByUser(user.uid).then((fetchedReviews) => {
      setReview(fetchedReviews);
    }).catch(() => {});
  }, [user.uid]);

  const fetchUserProfile = useCallback(() => {
    getUserProfile(user.uid).then((profile) => {
      setUserProfile(profile || {});
    }).catch(() => {});
  }, [user.uid]);

  const fetchCommentedReviews = useCallback(async () => {
    try {
      const userComments = await getCommentsByUser(user.uid);
      if (userComments && userComments.length > 0) {
        const allReviews = await getReview();
        const reviewIds = new Set(userComments.map((c) => c.reviewId));
        const filtered = allReviews.filter((r) => reviewIds.has(r.firebaseKey));
        setCommentedReviews(filtered);
      }
    } catch (error) {
      console.error('Error fetching commented reviews:', error);
    }
  }, [user.uid]);

  useEffect(() => {
    if (user?.uid) {
      fetchReviews();
      fetchUserProfile();
      fetchCommentedReviews();
    }
  }, [fetchReviews, fetchUserProfile, fetchCommentedReviews, user?.uid]);

  return (
    <div className="container py-5" style={{ textAlign: 'left' }}>
      <h1 className="text-primary mb-5">My Dashboard</h1>

      {/* Profile Card */}
      <div className="mb-5">
        <div className="card shadow rounded-lg bg-primary-light" style={{ maxWidth: '400px' }}>
          <div className="card-body">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.photoURL}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{
                width: '100px', height: '100px', objectFit: 'cover', display: 'block',
              }}
            />
            <h3 className="text-primary mb-1">{user.displayName}</h3>
            <p className="text-secondary small mb-3">{user?.email}</p>
            {userProfile?.bio && (
              <div className="mb-4">
                <p className="text-dark small">{userProfile.bio}</p>
              </div>
            )}
            <Link href="/review/new" passHref>
              <button type="button" className="btn btn-primary w-100 mb-2">
                ✏️ Write a Review
              </button>
            </Link>
            <Link href="/profile/edit" passHref>
              <button type="button" className="btn btn-secondary w-100 mb-2">
                ⚙️ Edit Profile
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-5">
        <h2 className="text-primary mb-3">My Reviews</h2>
        <p className="text-secondary small mb-4">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>

        {reviews.length > 0 ? (
          <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
            {reviews.map((review) => (
              <div key={review.firebaseKey || review.address}>
                <AuthReviewCard
                  reviewObj={review}
                  onDashboard
                  onUpdate={fetchReviews}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card shadow rounded-lg bg-light p-5">
            <p className="text-secondary mb-3">
              You haven&apos;t written any reviews yet.
            </p>
            <Link href="/review/new" passHref>
              <button type="button" className="btn btn-primary">
                Write Your First Review
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Commented Reviews Section */}
      <div>
        <h2 className="text-primary mb-3">Reviews I&apos;ve Commented On</h2>
        <p className="text-secondary small mb-4">
          {commentedReviews.length} review{commentedReviews.length !== 1 ? 's' : ''}
        </p>

        {commentedReviews.length > 0 ? (
          <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
            {commentedReviews.map((review) => (
              <div key={review.firebaseKey || review.address}>
                <AuthReviewCard
                  reviewObj={review}
                  onDashboard={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card shadow rounded-lg bg-light p-5">
            <p className="text-secondary mb-3">
              You haven&apos;t commented on any reviews yet.
            </p>
            <Link href="/" passHref>
              <button type="button" className="btn btn-primary">
                Browse Reviews
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
