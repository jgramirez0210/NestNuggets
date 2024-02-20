import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  history.push('/')
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
