import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteReview, getWasThisReviewHelpful } from '../api/reviewData';

function AuthReviewCard({ reviewObj, onDashboard, onUpdate }) {
  AuthReviewCard.defaultProps = {
    onUpdate: () => {},
    onDashboard: false,
  };

  const [reviewAverageRating, setReviewAverageRating] = useState(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const wasReviewHelpfulData = await getWasThisReviewHelpful(reviewObj.firebaseKey);
        console.log('wasReviewHelpfulData:', wasReviewHelpfulData);
        if (wasReviewHelpfulData.length > 0) {
          const ratings = wasReviewHelpfulData
            .map((item) => {
              const rating = parseFloat(item.rating);
              return isNaN(rating) ? null : rating;
             })
  .filter((rating) => rating !== null);
if (ratings.length === 0) {
  setReviewAverageRating(null);
  return;
}
const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
setReviewAverageRating(averageRating);
        } else {
          setReviewAverageRating(null);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
        setReviewAverageRating(null);
      }
    };

    if (reviewObj.firebaseKey) {
      fetchAverageRating();
    }
  }, [reviewObj.firebaseKey]);

  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      {reviewObj && (
        <Card.Img
          variant="top"
          src={reviewObj.photo}
          alt={reviewObj.address}
          style={{ height: '400px' }}
        />
      )}
      <Card.Body>
        <Card.Title>Address: {reviewObj && reviewObj.address}</Card.Title>
        <p className="card-text bold">
          <span>Review of the Property: </span>
          {reviewObj && reviewObj.reviewProperty}
        </p>
        {reviewAverageRating !== null && <p>Average Rating: {reviewAverageRating.toFixed(2)}</p>}
        {onDashboard && (
          <>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">
              DELETE
            </Button>
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
          </>
        )}
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS */}
        {reviewObj && (
          <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">
              VIEW MORE DETAILS
            </Button>
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
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        review: PropTypes.number,
      })
    ),
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func,
};

export default AuthReviewCard;
