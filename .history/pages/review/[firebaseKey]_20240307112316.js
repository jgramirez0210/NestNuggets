/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewReviewDetails from '../../api/mergeData';
import WasThisReviewHelpful from '../../components/WasThisHelpfulComponent';

export default function ViewReview(
  reviewObj,
) {
  const [reviewDetails, setReviewDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewReviewDetails(firebaseKey).then(setReviewDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={reviewDetails.photo} alt={reviewDetails.address} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
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
          firebaseKey={reviewObj.firebaseKey} 
        reviews={reviewObj.reviews} />
        </p>
    </div>
  );
}
