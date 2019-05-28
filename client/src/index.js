import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import App from './App';
import createRootReducer from 'reducers';
import { loadState, saveState } from 'utils/localStorage';
import 'typeface-roboto';
import 'index.css';


const history = createBrowserHistory();

const HYDRATE_STATE = false;
const SAVE_STATE = false;

const persistedState = loadState();
const loggerMiddleware = createLogger();
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware(history))
);

// TODO: modify save and hydrate to NOT factor in UI portion of state
const storeInputArgs = HYDRATE_STATE
  ? [createRootReducer(history), persistedState, middleware]
  : [createRootReducer(history), middleware];

const store = createStore(...storeInputArgs);


if (SAVE_STATE) {
  store.subscribe(throttle(() => {
    saveState(store.getState())
   }, 1000));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
