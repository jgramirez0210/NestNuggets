import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import getWasThisHelpfulReviewById from './WasThisHelpfulComponent';
import { deleteReview, getWasThisReviewHelpful } from '../api/reviewData';

function AuthReviewCard({
  reviewObj, onDashboard, onUpdate,
}) {
  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
  };
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  useEffect(() => {
    getWasThisReviewHelpful(payload)
      .then((data) => {
        setHelpfulReviews(Object.values(data));
      })
      .catch((error) => console.error(error));
  }, []);

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
        {onDashboard && (
          <>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">DELETE</Button>
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <p>
{helpfulReviews.map}
            </p>
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
    reviews: PropTypes.arrayOf(PropTypes.shape({
      review: PropTypes.number,
    })),
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func,
};

export default AuthReviewCard;
