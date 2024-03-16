import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import viewReviewDetails from '../../api/mergeData';
import WasThisReviewHelpful from '../../components/WasThisHelpfulComponent';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const [reviews, setReviews] = useState([]); // Define reviews as state
  const router = useRouter();

  // Grab firebaseKey from url
  const { firebaseKey } = router.query;

  // Make call to API layer to get the data
  useEffect(() => {
    viewReviewDetails(firebaseKey).then((data) => {
      console.warn('viewReviewDetails Response:', data);
      setReviewDetails(data);
      // Set reviews here if it's derived from data
    });
  }, [firebaseKey]);

  // If reviewDetails is null, render a loading message
  if (!reviewDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 d-flex flex-wrap review-details">
      <div className="d-flex flex-column">
        <Image src={reviewDetails.photo} alt={reviewDetails.address} width={300} height={200} />
      </div>
      <div className="ms-5 details">
        <h5>
          {reviewDetails.address}
        </h5>
        <p>{reviewDetails.reviewProperty}</p>
        <p>{reviewDetails.reviewArea}</p>
        <p>{reviewDetails.reviewPropertyManager}</p>
        <p>{reviewDetails.monthlyPrice}</p>
        <p>{reviewDetails.rentalDuration}</p>
        <hr />
      </div>
      <p>
        <WasThisReviewHelpful
          firebaseKey={firebaseKey}
          reviews={reviews}
        />
      </p>
    </div>
  );
}
