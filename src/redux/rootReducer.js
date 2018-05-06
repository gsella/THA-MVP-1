import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './modules/app/reducer';
import insights from './modules/insights/insightsReducer';
import tags from './modules/tags/tagsReducer';

const rootReducer = combineReducers({
  app,
  insights,
  tags,
  form: formReducer
});

export default rootReducer;
