import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import graphPage from './modules/graphPage/graphPageReducer';
import categories from './modules/categories/categoriesReducer';
import insights from './modules/insights/insightsReducer';
import tags from './modules/tags/tagsReducer';

const rootReducer = combineReducers({
  graphPage,
  categories,
  insights,
  tags,
  form: formReducer,
});

export default rootReducer;
