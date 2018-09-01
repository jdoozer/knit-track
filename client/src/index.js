import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle';
import App from './App';
import rootReducer from 'reducers';
import { loadState, saveState } from 'utils/localStorage';
import 'typeface-roboto';
import 'index.css';

const HYDRATE_STATE = true;
const SAVE_STATE = false;

const persistedState = loadState();
const loggerMiddleware = createLogger();
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

const storeInputArgs = HYDRATE_STATE
  ? [rootReducer, persistedState, middleware]
  : [rootReducer, middleware];

const store = createStore(...storeInputArgs);

if (SAVE_STATE) {
  store.subscribe(throttle(() => {
    saveState(store.getState())
   }, 1000));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
