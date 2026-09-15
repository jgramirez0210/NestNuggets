import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getReviewByUser } from '../../api/reviewData.js';
import { getUserProfile } from '../../api/userData.js';
import AuthReviewCard from '../../components/AuthReviewCard.js';

export default function PublicProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [userProfile, setUserProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);

      const userReviews = await getReviewByUser(userId);
      setReviews(userReviews || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-secondary">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container py-5">
        <Link href="/">
          <a className="text-primary mb-4" style={{ display: 'inline-block' }}>
            ← Back to Home
          </a>
        </Link>
        <p className="text-secondary">User profile not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ textAlign: 'left' }}>
      <Link href="/">
        <a className="text-primary mb-4" style={{ display: 'inline-block' }}>
          ← Back to Home
        </a>
      </Link>

      <div className="card shadow rounded-lg bg-primary-light mb-5" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          {userProfile.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={userProfile.photoURL}
              alt={userProfile.displayName}
              className="rounded-circle mb-3"
              style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block' }}
            />
          )}
          <h2 className="text-primary mb-2">{userProfile.displayName}</h2>
          <p className="text-secondary small mb-4">{userProfile.email}</p>

          {userProfile.bio && (
            <div className="bg-white p-3 rounded-lg mb-4">
              <p className="text-dark mb-0">{userProfile.bio}</p>
            </div>
          )}

          <p className="text-secondary small">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {reviews.length > 0 ? (
        <>
          <h3 className="text-primary mb-4">Reviews by {userProfile.displayName}</h3>
          <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
            {reviews.map((review) => (
              <div key={review.firebaseKey || review.address}>
                <AuthReviewCard
                  reviewObj={review}
                  onDashboard={false}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card shadow rounded-lg bg-light p-5">
          <p className="text-secondary">
            {userProfile.displayName} hasn't written any reviews yet.
          </p>
        </div>
      )}
    </div>
  );
}
