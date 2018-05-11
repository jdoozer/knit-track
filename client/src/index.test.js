import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import App from './App';
import rootReducer from 'reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>),
  div);
});
