import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import createRootReducer from 'reducers';
import { loadState, saveState } from 'utils/localStorage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'mui/knitTrackTheme';
import 'typeface-roboto';
import 'index.css';


const HYDRATE_STATE = false;
const SAVE_STATE = false;

const persistedState = loadState();
const middleware = (process.env.NODE_ENV === `development`)
  ? composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
  : applyMiddleware(thunkMiddleware);


const storeInputArgs = HYDRATE_STATE
  ? [createRootReducer, persistedState, middleware]
  : [createRootReducer, middleware];

const store = createStore(...storeInputArgs);


if (SAVE_STATE) {
  store.subscribe(throttle(() => {
    saveState(store.getState())
   }, 1000));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
