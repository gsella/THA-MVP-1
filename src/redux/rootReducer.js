import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import graphPage from './modules/graphPage/graphPageReducer';
import categories from './modules/categories/categoriesReducer';
import insights from './modules/insights/insightsReducer';
import insightsPage from './modules/insightsPage/insightsPageReducer';
import tags from './modules/tags/tagsReducer';
import thunders from './modules/thunders/thundersReducer';

const rootReducer = combineReducers({
  graphPage,
  thunders,
  categories,
  insights,
  insightsPage,
  tags,
  form: formReducer,
});

export default rootReducer;
