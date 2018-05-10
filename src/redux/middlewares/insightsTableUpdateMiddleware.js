import { change, actionTypes } from 'redux-form';

/**
 * Responsible to handle change,swap,delete of insights to mark updated rows
 */
export default store => next => action => {
  if (
    action.type === actionTypes.CHANGE &&
    action.meta.form === 'insightsTable' &&
    !action.meta.field.includes('isUpdated')
  ) {
    const insight = action.meta.field.split('.')[0];

    store.dispatch(change('insightsTable', `${insight}.isUpdated`, true));
  }

  next(action);
};
