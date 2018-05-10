import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import changeCategoryMiddleware from './middlewares/changeCategoryMiddleware';
import swapInsightsMiddleware from './middlewares/swapInsightsMiddleware';
import insightsTableUpdateMiddleware from './middlewares/insightsTableUpdateMiddleware';

import rootReducer from 'redux/rootReducer';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      changeCategoryMiddleware,
      swapInsightsMiddleware,
      insightsTableUpdateMiddleware,
      promise(),
      thunk
    )
  )
);
