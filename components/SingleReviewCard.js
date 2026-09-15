import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars.js';
import { deleteReview } from '../api/reviewData.js';

function SingleReviewCard({ reviewObj, onDashboard, onUpdate }) {
  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card className="shadow rounded-lg" style={{ width: '40rem', margin: 'var(--spacing-md)' }}>
      {reviewObj && (
        <Card.Img
          variant="top"
          src={reviewObj.image}
          alt={reviewObj.address}
          style={{ height: '280px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="bg-primary-light">
        <Card.Title className="text-primary m-0">
          {reviewObj && reviewObj.address}
        </Card.Title>
        <p className="card-text text-secondary mt-2">
          <span className="fw-semibold">Property Rating: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        <p className="text-secondary small">
          <strong>Monthly Price:</strong> {reviewObj.monthlyPrice}
        </p>
        <p className="text-secondary small">
          <strong>Rental Duration:</strong> {reviewObj.rentalDuration}
        </p>
        {reviewObj.dateTime && (
          <p className="text-secondary small">
            <strong>Date:</strong> {reviewObj.dateTime}
          </p>
        )}

        <div className="d-flex gap-2 flex-wrap mt-3">
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
      </Card.Body>
    </Card>
  );
}
SingleReviewCard.defaultProps = {
  onDashboard: false,
};
SingleReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    image: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    monthlyPrice: PropTypes.number,
    rentalDuration: PropTypes.string,
    dateTime: PropTypes.string,
    reviewRating: PropTypes.shape({
      overall: PropTypes.number,
      management: PropTypes.number,
      safety: PropTypes.number,
    }),
    firebaseKey: PropTypes.string,
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
};
export default SingleReviewCard;
