import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

// Add an observer for changes in the user's sign-in state
const observeAuthState = (userChangeHandler) => {
  firebase.auth().onAuthStateChanged(userChangeHandler);
};

export { signIn, signOut, observeAuthState };
