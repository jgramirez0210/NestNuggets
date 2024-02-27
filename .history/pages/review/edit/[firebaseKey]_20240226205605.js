import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import AddAReviewForm from '../../../components/forms/addAReviewForm';

export default function EditReview() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReview(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<AddAReviewForm obj={editItem} />);
}
