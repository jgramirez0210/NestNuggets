import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getWasThisHelpfulReviewById from './WasThisHelpfulComponent.js';
import { deleteReview, getWasThisHelpfulReviewRating } from '../api/reviewData.js';
import GetStars from './GetStars.js';

function AuthReviewCard({
  reviewObj, onDashboard, onUpdate,
}) {
  const handleCardClick = () => {
    const key = reviewObj?.firebaseKey;
    if (key) {
      window.location.href = `/review/${key}`;
    }
  };

  console.log('Review Object:', reviewObj); // Debug log

  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
  };
  const [helpfulReviews, setHelpfulReviews] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const countRatings = (data) => {
    const ratings = data.filter((rating) => !Number.isNaN(rating));
    return ratings.length;
  };

  useEffect(() => {
    getWasThisHelpfulReviewRating(reviewObj.firebaseKey)
      .then((data) => {
        if (data === null) {
          return;
        }

        if (typeof data === 'object') {
          const ratings = Object.values(data).map((ratingObj) => ratingObj.rating);
          const sum = ratings.reduce((a, b) => a + b, 0);
          const avg = ratings.length ? sum / ratings.length : 0;
          const stars = GetStars(avg);
          const count = countRatings(ratings);

          setHelpfulReviews(stars);
          setNumberOfRatings(count);
        }
      });
  }, [reviewObj]);

  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card
      className="shadow rounded-lg overflow-hidden"
      style={{ width: '30rem', margin: 'var(--spacing-md)', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      {reviewObj && (
        <Card.Img
          variant="top"
          src={reviewObj.photo}
          alt={reviewObj.address}
          style={{ height: '280px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="bg-primary-light" style={{ textAlign: 'left' }}>
        <Card.Title className="text-primary m-0 mb-2" style={{ textAlign: 'left' }}>
          {reviewObj && reviewObj.address ? reviewObj.address : 'Property Address'}
        </Card.Title>

        <div className="small mb-3">
          {reviewObj?.monthlyPrice && (
            <p className="m-0 text-secondary" style={{ textAlign: 'left' }}>
              <strong>Price:</strong> {reviewObj.monthlyPrice}/mo
            </p>
          )}
          {reviewObj?.rentalDuration && (
            <p className="m-0 text-secondary" style={{ textAlign: 'left' }}>
              <strong>Duration:</strong> {reviewObj.rentalDuration}
            </p>
          )}
          {reviewObj?.reviewProperty && (
            <p className="m-0 text-secondary" style={{ textAlign: 'left' }}>
              <strong>Property:</strong> {reviewObj.reviewProperty}
            </p>
          )}
          {reviewObj?.reviewArea && (
            <p className="m-0 text-secondary" style={{ textAlign: 'left' }}>
              <strong>Area:</strong> {reviewObj.reviewArea}
            </p>
          )}
        </div>

        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="d-flex gap-2 flex-wrap mt-3" onClick={(e) => e.stopPropagation()}>
          {onDashboard && (
            <>
              <Button
                variant="danger"
                onClick={deleteThisReview}
                className="btn btn-sm"
              >
                Delete
              </Button>
              <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
                <Button variant="info" className="btn btn-sm">
                  Edit
                </Button>
              </Link>
            </>
          )}
          {reviewObj && (
            <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
              <Button variant="primary" className="btn btn-sm flex-grow-1">
                View Details
              </Button>
            </Link>
          )}
        </div>

        {reviewObj && (
          <div className="mt-3 pt-3 border-top" style={{ textAlign: 'left' }}>
            <p className="m-0 text-primary">
              <strong>Helpful Rating:</strong> {helpfulReviews} ⭐
            </p>
            <p className="m-0 text-secondary small">
              {numberOfRatings} people found this helpful
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
AuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    photo: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    reviewArea: PropTypes.string,
    monthlyPrice: PropTypes.string,
    rentalDuration: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      review: PropTypes.number,
    })),
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func,
};

export default AuthReviewCard;
