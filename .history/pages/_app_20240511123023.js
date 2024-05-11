/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useRef, useEffect, useState } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import emailjs from '@emailjs/browser';
import { AuthProvider } from '../utils/context/authContext.js';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector.js';

function MyApp({ Component, pageProps }) {
  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  useEffect(() => emailjs.init('service_wkf9g74'))
  return (
    <AuthProvider>
      <ViewDirectorBasedOnUserAuthStatus
          // if status is pending === loading
          // if status is logged in === view app
          // if status is logged out === sign in page
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
