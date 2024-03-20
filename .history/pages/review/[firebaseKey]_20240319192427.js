import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import viewReviewDetails from '../../api/mergeData';
import WasThisReviewHelpful from '../../components/WasThisHelpfulComponent';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewReviewDetails(firebaseKey).then((data) => {
      setReviewDetails(data);
    });
  }, [firebaseKey]);

  if (!reviewDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 d-flex flex-wrap review-details">
      <div className="d-flex flex-column">
        {reviewDetails.photo && <Image src={reviewDetails.photo} alt={reviewDetails.address} width={300} height={200} />}
      </div>
      <div className="ms-5 details">
        <h5>{reviewDetails.address}</h5>
        <div>
          <div>
            <strong>Monthly Price:</strong> {reviewDetails.monthlyPrice}
          </div>
          <div>
            <strong>Property Review:</strong> {reviewDetails.reviewProperty}
          </div>
          <div>
            <strong>Area Review:</strong> {reviewDetails.reviewArea}
          </div>
          <div>
            <strong>Property Manager Review:</strong> {reviewDetails.reviewPropertyManager}
          </div>
          <div>
            <strong>Rental Duration:</strong> {reviewDetails.rentalDuration}
          </div>
        </div>
      </div>
      <div>
        <WasThisReviewHelpful
        reviewId={currentReviewId}
          firebaseKey={firebaseKey}
          reviews={reviews}
        />
      </div>
    </div>
  );
}
