import { getMatchingData } from 'redux/modules/app/actions.js';

export const searchMiddleWare = store => next => action => {
  if (action.type === '@@redux-form/CHANGE') {
    if (action.meta.form === 'searchForm') {
      store.dispatch(getMatchingData(action.payload));
    }
  }
  next(action);
}