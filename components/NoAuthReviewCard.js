import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { signIn } from '../utils/auth.js';
import GetStars from './GetStars.js';

function NoAuthReviewCard({ reviewObj }) {
  return (
    <Card className="shadow rounded-lg" style={{ width: '30rem', margin: 'var(--spacing-md)' }}>
      {reviewObj && (
        <Card.Img
          variant="top"
          src={reviewObj.photo}
          alt={reviewObj.address}
          style={{ height: '280px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="bg-primary-light">
        <Card.Title className="text-primary m-0">
          {reviewObj && reviewObj.address}
        </Card.Title>
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <Button
            variant="primary"
            className="btn btn-primary mt-3 w-100"
            onClick={signIn}
          >
            Log In to View More Details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

NoAuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    photo: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    reviewPropertyManager: PropTypes.string,
    reviewRating: PropTypes.shape({
      management: PropTypes.string,
      overall: PropTypes.string,
      safety: PropTypes.string,
    }),
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default NoAuthReviewCard;
