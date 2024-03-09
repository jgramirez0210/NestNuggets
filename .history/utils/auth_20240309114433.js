import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

const observeAuthState = (userChangeHandler) => firebase.auth().onAuthStateChanged(userChangeHandler);

export { signIn, signOut, observeAuthState };
