import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

/* 'create-react-app' AUTOMATICALLY creates the environment variables 'development', 'production' 
and 'test' for us */
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// This 'persistor' below is essentially a PERSISTED version of our 'store'
const persistor = persistStore(store);

export { store, persistor };
