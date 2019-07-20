import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
/* With this 'storage' below that we're pulling out from the 'redux-persist' library we're pretty much  
telling to 'redux-persist' that we want to use 'localStorage'(we're refering to the 'window.localStorage') as 
our default storage. We could have also imported 'sessionStorage' from 'redux-persist' BUT for our needs we want 
to use the 'localStorage' that in the 'redux-persist' library is coming from 'lib/storage' */
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

/* Inside the 'whitelist' property below we add an ARRAY that contains the STRING name of the reducer we
want to store, in our case the ONLY reducer that we want to PERSIST(through 'localStorage') is  the 'cart'
Reducer, so we just pass the 'cart' string inside the Array */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

/* What we're exporting below as default is a MODIFIED version of our 'rootReducer' except now with PERSISTENCE 
capabilities thanks to the 'persistReducer' Function we got from the 'redux-persist' Library */
export default persistReducer(persistConfig, rootReducer);
