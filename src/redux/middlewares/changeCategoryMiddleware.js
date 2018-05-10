import { actionTypes, focus } from 'redux-form';

export default store => next => action => {
  if (
    action.type === actionTypes.CHANGE &&
    action.meta.form === 'insightsTable' &&
    action.meta.field.includes('categoryId') &&
    !action.isDuplicate
  ) {
    // setTimeout(() => store.dispatch(
    //   focus('insightsTable', action.meta.field)
    // ), 2000)
  }

  next(action);
};
