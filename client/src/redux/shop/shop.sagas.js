import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';
import { ShopActionTypes } from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    /* When we CALL the 'collectionRef.get()' here below, the VALUE that comes back from it comes back in a 
    PROMISE form that gets resolve with the VALUE of our 'collectionRef'(which is our "snapshot"). So instead
    of chaining the '.then' and then getting the 'snapshot' inside the Callback that we pass in the '.then'(and
    we did this when we used the 'thunk' middleware), just like we use 'async-await' we're NOW getting back that 
    'snapshot' value DIRECTLY from the 'yield'(that is similar to the 'async-await') and assigning that value to
    the 'snapshot' CONSTANT we just created below */
    const snapshot = yield collectionRef.get();
    /* This 'call' we're using below is an EFFECT coming from the 'redux-saga' Library, all it does is INVOKING
    the FUNCTION that we pass as FIRST argument(inside the 'call' itself) with the argument that we pass as 
    SECOND argument to the 'call'. So here below what we're doing with the 'call' is INVOKING the 
    'convertCollectionsSnapshotToMap' Function with the 'snapshot' as ARGUMENT. We then also use the 'yield' in
    case that the Function we 'call'(so the 'convertCollectionsSnapshotToMap') takes LONGER than what we expect.
    So we want to be able to use the 'call' EFFECT of 'redux-saga' whenever we can. So again this 'call' is a 
    method that takes as FIRST argument a Function and then the subsequent arguments(that we pass inside the 'call')
    will be the PARAMETER(or parameters if we have more) that we pass INSIDE the Function(the one we pass as first
    argument), in the end because we're also using the 'yield' we're able to DIFFER the control of the execution
    of this code to the SAGA Middleware, so that for example if we need to CANCEL the execution of this code we've
    a place where we're able to do so */
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    /* When we're inside of a "Saga GENERATOR Function"(like this one) we CAN'T dispatch Actions using the 
    'dispatch' KEYWORD(so the one we used while using 'redux-thunk' pretty much) BUT we have to use another 
    EFFECT that we import from 'redux-saga' called 'put'(is the EQUIVALENT of 'dispatch' and we use it 
    EXACTLY like we do with 'dispatch') */
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
