import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import Next from 'next';
import { useAuth } from '../../utils/context/authContext';
import 'firebase/auth';

export default function ViewUserDetails() {
  // const [, setUserDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    // viewAuthorDetails(firebaseKey).then(setUserDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <p>
        Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

Check the render method of `ViewUserDetails`.
        </p>
        <p>
          User&apos;s email: {user?.email}
        </p>
        <p>
          User&apos;s name: {user.displayName}
        </p>
        <p>
          User&apos;s last login: {user.metadata.lastSignInTime}
        </p>
        <button type="button" onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </div>
    </div>
  );
}
