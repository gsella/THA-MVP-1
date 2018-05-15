import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import handleIsEmptyFlagMiddleware from './middlewares/handleIsEmptyFlagMiddleware';
import swapInsightsMiddleware from './middlewares/swapInsightsMiddleware';
import insightsTableUpdateMiddleware from './middlewares/insightsTableUpdateMiddleware';

import rootReducer from 'redux/rootReducer';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      handleIsEmptyFlagMiddleware,
      swapInsightsMiddleware,
      insightsTableUpdateMiddleware,
      promise(),
      thunk
    )
  )
);
