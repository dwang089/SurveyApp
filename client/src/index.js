import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import materializeCSS from 'materialize-css/dist/css/materialize.min.css'

import App from './components/App';
import reducers from './reducers';

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
);