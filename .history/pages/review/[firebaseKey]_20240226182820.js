/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewBookDetails } from '../../api/mergedData';

export default function ViewBook() {
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
        <img src={reviewDetails.image} alt={reviewDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {reviewDetails.title} by {reviewDetails.authorObject?.first_name} {reviewDetails.authorObject?.last_name}
          {reviewDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${reviewDetails.authorObject?.email}`}>{reviewDetails.authorObject?.email}</a>
        <p>{reviewDetails.description || ''}</p>
        <hr />
        <p>
          {reviewDetails.sale
            ? `🏷️ Sale $${reviewDetails.price}`
            : `$${reviewDetails.price}`}
        </p>
      </div>
    </div>
  );
}
