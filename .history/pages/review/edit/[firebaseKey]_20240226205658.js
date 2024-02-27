import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import AddTeamMemberForm from '../../../components/forms/addTeamMemberForm';

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
  return (<AddTeamMemberForm obj={editReview} />);
}
