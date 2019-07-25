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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

/* Utility Function to create a new collection(that will take the name of the string we pass 
in place of the 'collectionKey' argument when we use the 'addCollectionAndDocument' Function
here below) and add inside it ALL the documents to Firestore */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // Create a 'write batch'
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    /* Create a new 'DocumentReference' Object withing the 'collections' collection
    If we don't pass ANYTHING inside the 'doc()' method, an automatically-generated 
    unique ID will be created by Firebase and used for the returned DocumentReference */
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // Commit the batch
  return await batch.commit();
};

/* This function will convert the data coming back from the 'collections.docs'(so from the 'collections' Firebase 
collection) from an ARRAY to an OBJECT(because we want to use an HASH TABLE that is more perfomant than an Array) */
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    /* Here we're destructuring off of the 'doc' ARRAY only the elements we NEED, that are
    the 'title' and 'items'. To retrieve the REAL data from the 'DocumentSnapshot' Objects
    (that is what is inside the 'doc' Array) we have to use the 'data()' method */
    const { title, items } = doc.data();

    return {
      /* This 'encodeURI' takes a STING as argument and convert(from the string we pass) ANY characters 
      that is NOT supported by regular URLS into values that can be used. In our case what we're passing
      in is the 'title' because THAT is what we use as parameter inside one of our ROUTE(in the 'shop'
      component when we go to 'path={`${match.path}/:collectionId`}') */
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  /* This 'return' below is needed because from this 'convertCollectionsSnapshotToMap' Function in the
  end we want to return the WHOLE Object that we just reduced below */
  return transformedCollection.reduce((accumulator, collection) => {
    /* With this code below we're pretty much creating the KEY of the new Object that we're going
    to return in the end, and put the VALUE of these key to the specific 'collection'. So in the 
    end we're converting the 'transformedCollection' ARRAY into an Object that will look like this
    {
      hats: {id: 1, title: "Hats", routeName: "hats", items: Array(9)},
      sneakers: {id: 2, title: "Sneakers", routeName: "sneakers", items: Array(8)},
      jackets: {id: 3, title: "Jackets", routeName: "jackets", items: Array(5)},
      womens: {id: 4, title: "Womens", routeName: "womens", items: Array(7)},
      mens: {id: 5, title: "Mens", routeName: "mens", items: Array(6)},
    } */
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
