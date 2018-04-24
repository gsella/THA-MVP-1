import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/styles/index.css';
import Router from 'components/containers/Router';
import store from 'redux/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
