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
    <Card style={{ width: '40rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.image} alt={reviewObj.address} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p className="card-text bold">
          <span>Review of the Property: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        <p>
          {reviewObj.monthlyPrice}
        </p>
        <p>
          {reviewObj.rentalDuration}
        </p>
        <p>
          {reviewObj.dateTime}
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
