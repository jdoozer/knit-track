import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle';

import 'typeface-roboto';
import './index.css';

import knitTrack from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(knitTrack, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState())
 }, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
