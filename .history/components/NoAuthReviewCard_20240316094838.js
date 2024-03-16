import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { signIn } from '../utils/auth';
import GetStars from './GetStars';

function NoAuthReviewCard({ reviewObj }) {
  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.photo} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p>
          <s>User Ratings: </s
        </p>
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
        <Button variant="primary" className="m-2" onClick={signIn}>
          LOG IN TO VIEW MORE DETAILS
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
