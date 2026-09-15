import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import viewReviewDetails from '../../api/mergeData.js';
import WasThisReviewHelpful from '../../components/WasThisHelpfulComponent.js';
import ReportInaccuracyForm from '../../components/forms/reportInaccuracyForm.js';
import CommentsSection from '../../components/CommentsSection.js';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleButtonClick = () => {
    router.push(`/reportInaccuracy/${firebaseKey}`);
  };

  useEffect(() => {
    if (!router.isReady || !firebaseKey) return;

    viewReviewDetails(firebaseKey)
      .then((data) => {
        setReviewDetails(data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load review');
      });
  }, [router.isReady, firebaseKey]);

  if (!firebaseKey) {
    return (
      <div className="container py-5 text-center">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!reviewDetails) {
    return (
      <div className="container py-5 text-center">
        <p className="text-secondary">Loading review...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <Image
            src={reviewDetails.photo}
            alt={reviewDetails.address}
            width={500}
            height={350}
            priority
            style={{ objectFit: 'cover', borderRadius: 'var(--border-radius-lg)' }}
          />
        </div>
        <div className="col-md-6">
          <div className="bg-primary-light p-4 rounded-lg">
            <h2 className="text-primary mb-4">{reviewDetails.address}</h2>
            <div className="mb-3">
              <p className="text-secondary mb-2">
                <strong>Monthly Price:</strong>
              </p>
              <p className="text-dark">{reviewDetails.monthlyPrice}</p>
            </div>
            <div className="mb-3">
              <p className="text-secondary mb-2">
                <strong>Property Review:</strong>
              </p>
              <p className="text-dark">{reviewDetails.reviewProperty}</p>
            </div>
            <div className="mb-3">
              <p className="text-secondary mb-2">
                <strong>Area Review:</strong>
              </p>
              <p className="text-dark">{reviewDetails.reviewArea}</p>
            </div>
            <div className="mb-3">
              <p className="text-secondary mb-2">
                <strong>Property Manager Review:</strong>
              </p>
              <p className="text-dark">{reviewDetails.reviewPropertyManager}</p>
            </div>
            <div className="mb-4">
              <p className="text-secondary mb-2">
                <strong>Rental Duration:</strong>
              </p>
              <p className="text-dark">{reviewDetails.rentalDuration}</p>
            </div>
            <button
              type="button"
              className="btn btn-outline w-100"
              onClick={handleButtonClick}
            >
              Report Inaccuracy
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h3 className="text-primary mb-4">Was This Review Helpful?</h3>
          <div className="bg-primary-light p-4 rounded-lg">
            <WasThisReviewHelpful firebaseKey={firebaseKey} />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <CommentsSection reviewId={firebaseKey} />
        </div>
      </div>
    </div>
  );
}
