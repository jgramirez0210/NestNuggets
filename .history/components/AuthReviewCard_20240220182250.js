import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import GetStars from './GetStars';
import { deleteReview } from '../api/reviewData';

function AuthReviewCard({ reviewObj, onDashboard, onUpdate }) {
  const [reviews, setReviews] = useState([]);

  const updateReviews = () => {
    getReviews().then(setReviews);
  };
  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => onUpdate());
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
        {onDashboard && (
          <>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">DELETE</Button>
            <Button variant="primary" className="m-2">Edit</Button>
          </>
        )}
        {/* DYNAMIC LINK TO VIEW THE REVIEW DETAILS  */}
        {reviewObj && (
          <Link href={`/book/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW MORE DETAILS</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
AuthReviewCard.defaultProps = {
  onDashboard: false,
};
AuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    image: PropTypes.string,
    address: PropTypes.string,
    reviewProperty: PropTypes.string,
    rating: PropTypes.shape({
      overall: PropTypes.number,
      management: PropTypes.number,
      safety: PropTypes.number,
    }),
    firebaseKey: PropTypes.string,
  }).isRequired,
  onDashboard: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
};
export default AuthReviewCard;
