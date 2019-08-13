import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

/* The 'createSagaMiddleware' Function takes in an OBJECT if we want to pass some configurations, in our
case though we DON'T need them, so we just invoke the Function without passing anything inside it */
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

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

sagaMiddleware.run(rootSaga);

// This 'persistor' below is essentially a PERSISTED version of our 'store'
const persistor = persistStore(store);

export { store, persistor };
