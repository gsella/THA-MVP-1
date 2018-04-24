import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import app from './modules/app/reducer';

const rootReducer = combineReducers({
  app,
  form: formReducer,
});

export default rootReducer;
