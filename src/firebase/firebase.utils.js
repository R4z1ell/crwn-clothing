import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBVzPZgPehkHHN0YHXakeMT-UmCDmapxvw',
  authDomain: 'crwn-db-169af.firebaseapp.com',
  databaseURL: 'https://crwn-db-169af.firebaseio.com',
  projectId: 'crwn-db-169af',
  storageBucket: '',
  messagingSenderId: '887276359808',
  appId: '1:887276359808:web:b17a692e3cbaa170'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
