import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import changeCategoryMiddleware from './middlewares/changeCategoryMiddleware';

import rootReducer from 'redux/rootReducer';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(changeCategoryMiddleware, promise(), thunk)
  )
);
