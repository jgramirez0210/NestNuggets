import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { deleteReview } from '../api/reviewData';

function AuthReviewCard({
  reviewObj, onDashboard, onUpdate, reviewRatingObj,
}) {
  AuthReviewCard.defaultProps = {
    onDashboard: false,
    reviewRatingObj: {},
  };

  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.photo} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p className="card-text bold">
          <span>Review of the Property: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        <p>
          <span>User Ratings: </span>
          {/* Access and display the ratings here */}
          {reviewRatingObj && reviewRatingObj.rating && (
            <>
              <span>Overall: {GetStars(reviewRatingObj.reviewRating.overall)}</span><br />
              <span>Management: {GetStars(reviewRatingObj.reviewRating.management)}</span><br />
              <span>Safety: {GetStars(reviewRatingObj.reviewRating.safety)}</span>
            </>
          )}
        </p>
        {onDashboard && (
          <>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">DELETE</Button>
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
          </>
        )}
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW MORE DETAILS</Button>
          </Link>
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
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  reviewRatingObj: PropTypes.shape({
    reviewRating: PropTypes.shape({
    }),
    overall: PropTypes.number,
    management: PropTypes.number,
    safety: PropTypes.number,

  }),
};

export default AuthReviewCard;
