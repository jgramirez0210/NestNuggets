import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import AddTeamMemberForm from '../../../components/forms/addTeamMemberForm';
import AddAReviewForm from '../../../components/forms/addAReviewForm';

export default function EditReview() {
  const [editReview, setEditReview] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleReview(firebaseKey).then((data) => {
      setEditReview(data);
    });
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AddAReviewForm obj={editReview} />);
}
