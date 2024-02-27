/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewReviewDetails } from '../../api/reviewData';

export default function ViewReview() {
  const [reviewDetails, setBookDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewReviewDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]);

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
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
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
export default ViewReview;
