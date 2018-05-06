import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './modules/app/reducer';
import categories from './modules/categories/categoriesReducer';
import insights from './modules/insights/insightsReducer';
import tags from './modules/tags/tagsReducer';

const rootReducer = combineReducers({
  app,
  categories,
  insights,
  tags,
  form: formReducer,
});

export default rootReducer;
