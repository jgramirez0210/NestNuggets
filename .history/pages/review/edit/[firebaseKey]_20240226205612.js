import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/teamData';
import AddTeamMemberForm from '../../../components/forms/addTeamMemberForm';

export default function EditPlayer() {
  const [editPlayer, setEditPlayer] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePlayer(firebaseKey).then((data) => {
      setEditPlayer(data);
    });
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<AddTeamMemberForm obj={editPlayer} />);
}
