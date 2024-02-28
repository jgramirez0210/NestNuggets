import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import AddAReviewForm from '../../../components/forms/addAReviewForm';

export default function EditReview() {
  const [editReview, setEditReview] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the review data
  useEffect(() => {
    getSingleReview(firebaseKey).then((data) => {
      setEditReview(data);
    });
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AddAReviewForm obj={editReview} />);
}
