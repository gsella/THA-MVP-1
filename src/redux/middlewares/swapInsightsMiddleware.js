import { change, actionTypes } from 'redux-form';

/**
 * Responsible to handle swap of insights to cause swap of their categoryKey's
 */
export default store => next => action => {
  if (
    action.type === actionTypes.ARRAY_SWAP &&
    action.meta.form === 'insightsTable'
  ) {
    const { form } = store.getState();

    const itemA = form.insightsTable.values.insights[action.meta.indexA];
    const itemB = form.insightsTable.values.insights[action.meta.indexB];

    store.dispatch(
      change(
        'insightsTable',
        `insights[${action.meta.indexA}].order`,
        itemB.order
      )
    );
    store.dispatch(
      change(
        'insightsTable',
        `insights[${action.meta.indexB}].order`,
        itemA.order
      )
    );
  }

  next(action);
};
