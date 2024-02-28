/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewReviewDetails from '../../api/mergeData';

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
        <img src={reviewDetails.address} alt={reviewDetails.address} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {reviewDetails.title} by {reviewDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
          {bookDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>
          {bookDetails.sale
            ? `🏷️ Sale $${bookDetails.price}`
            : `$${bookDetails.price}`}
        </p>
      </div>
    </div>
  );
}
