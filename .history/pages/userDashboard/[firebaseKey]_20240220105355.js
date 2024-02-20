import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import Image from 'next/image';
import { useAuth } from '../../utils/context/authContext';
import 'firebase/auth';

export default function ViewUserDetails() {
  const { user } = useAuth();

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <p>
          <Image src={user.photoURL} alt="Profile" />
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
