
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(preloadedState) {

  const middlewares = [
    thunkMiddleware
  ];

  const enhancers = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const store = createStore(
    rootReducer, preloadedState, enhancers
  );

  return store;
}
