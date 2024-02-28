import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import firebase from 'firebase';
import

function NoAuthReviewCard({ reviewObj }) {
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.photo} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p>
          <span>User Ratings: </span>
          {/* Access and display the ratings here */}
          {reviewObj && reviewObj.rating && (
            <>
              <span>Overall: {GetStars(reviewObj.rating.overall)}</span><br />
              <span>Management: {GetStars(reviewObj.rating.management)}</span><br />
              <span>Safety: {GetStars(reviewObj.rating.safety)}</span>
            </>
          )}
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
    rating: PropTypes.shape({
      management: PropTypes.string,
      overall: PropTypes.string,
      safety: PropTypes.string,
    }),
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default NoAuthReviewCard;
