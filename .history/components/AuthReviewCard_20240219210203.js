import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function AuthReviewCard({ reviewObj }) {
  return (
    <Card style={{ width: '40rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.image} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>{reviewObj && reviewObj.address}</Card.Title>
        <p className="card-text bold">
          <span>Property: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        <p>
          <span>User Ratings: </span>
          {/* Access and display the ratings here */}
          {reviewObj && reviewObj.rating && (
            <>
              <span>Overall: {reviewObj.rating.overall}</span><br/>
              <span>Management: {reviewObj.rating.management}</span><br/>
              <span>Safety: {reviewObj.rating.safety}</span>
            </>
          )}
        </p>
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <Link href={`/book/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

AuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    image: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    reviewPropertyManager: PropTypes.string,
    rating: PropTypes.shape({
      management: PropTypes.string,
      overall: PropTypes.string,
      safety: PropTypes.string,
    }),
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default AuthReviewCard;
