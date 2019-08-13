import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  /* The 'all' Effect coming from 'redux-saga' takes an ARRAY of Sagas, through this Effect we're able to CALL
  multiple Sagas CONCURRENTLY, meaning that we can INITIALIZE all these Sagas at the SAME time(each Saga gets
  initialized on a NEW separate Task), and this is exactly why we're using the 'all' Effect */
  yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
