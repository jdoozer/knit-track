import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import createRootReducer from 'reducers';
import { loadLoginState } from 'utils/localStorage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'mui/knitTrackTheme';
import 'typeface-roboto';
import 'index.css';

const loginState = loadLoginState();

const middleware = (process.env.NODE_ENV === `development`)
  ? composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
  : applyMiddleware(thunkMiddleware);

const store = createStore(
  createRootReducer(loginState),
  middleware
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
