import React, { useEffect, useState } from 'react';
import { observeAuthState } from './auth'; // import from your auth.js file

function YourComponent() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        // User is signed in, update uid
        setUid(user.uid);
      } else {
        // No user is signed out, clear uid
        setUid(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // ...
}
