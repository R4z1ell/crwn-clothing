import { ShopActionTypes } from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

/* When the 'redux-thunk' middleware is enabled(and we've enabled it inside the 'store.js' file), ANY time we
attempt to return a Function INSTEAD of an Action Object, the middleware will call that Function with the 
'dispatch' method as the first argument(so this is why we've the 'dispatch' method AVAILABLE). So this is what
'redux-thunk' is in the end, is just a Function(that we call 'middleware') that return another Function that gets
access to the 'dispatch' method so that we're able to dispatch MULTIPLE actions and handle Asynchronous code inside
of it */
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => {
        dispatch(fetchCollectionsFailure(error.message));
      });
  };
};
