import { actionTypes, change, arrayPush } from 'redux-form';

export default store => next => action => {
  if ('meta' in action && action.meta.form === 'insightsTable') {
    const { form } = store.getState();

    /* Handle adding empty row at the first time */
    if (
      action.type === actionTypes.REGISTER_FIELD &&
      action.payload.name === 'insights'
    ) {
      store.dispatch(
        arrayPush('insightsTable', 'insights', {
          isEmpty: true,
          isCreated: true,
          isActive: true,
        })
      );
    }

    /* Mark row as nor empty on change select */
    /* And push new empty row */
    if (
      action.type === actionTypes.CHANGE &&
      action.meta.field.includes('categoryId')
    ) {
      const index = action.meta.field.match(/\d{1,}/);
      const insight = action.meta.field.split('.')[0];
      const item = form.insightsTable.values.insights[index];
      if (item.isEmpty) {
        const newInsights = form.insightsTable.values.insights.filter(
          item => item.isCreated
        );

        store.dispatch(change('insightsTable', `${insight}.isEmpty`, false));
        store.dispatch(
          change(
            'insightsTable',
            `${insight}.id`,
            `newInsight-${newInsights.length}`
          )
        );
        store.dispatch(
          arrayPush('insightsTable', 'insights', {
            isEmpty: true,
            isCreated: true,
            isActive: true,
          })
        );
      }
    }
  }

  next(action);
};
