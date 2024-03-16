import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import AddAReviewForm from '../../../components/forms/addAReviewForm';

export default function EditReview() {
  const [editReview, setEditReview] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReview(firebaseKey).then((data) => {
      setEditReview(data);
    });
  }, [firebaseKey]);

  return (
    yourFirebaseKey ? <AddAReviewForm firebaseKey={yourFirebaseKey} /> : 'Loading...'
  );
}
