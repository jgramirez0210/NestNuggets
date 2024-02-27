import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { updateReview } from '../../../api/reviewData';
import AddAReviewForm from '../../../components/forms/addAReviewForm';

export default function EditReview() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    updateReview(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AddAReviewForm obj={editItem} />);
}
