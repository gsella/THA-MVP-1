import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import handleIsEmptyFlagMiddleware from './middlewares/handleIsEmptyFlagMiddleware';
import insightsTableUpdateMiddleware from './middlewares/insightsTableUpdateMiddleware';
import changeOrderOnCategoryUpdateMiddleware from './middlewares/changeOrderOnCategoryUpdateMiddleware';

import rootReducer from 'redux/rootReducer';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      handleIsEmptyFlagMiddleware,
      changeOrderOnCategoryUpdateMiddleware,
      insightsTableUpdateMiddleware,
      promise(),
      thunk
    )
  )
);
