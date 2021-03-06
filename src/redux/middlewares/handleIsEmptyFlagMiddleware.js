import { actionTypes, change, arrayPush } from 'redux-form';

/* Mark existiong row as not empty and giving an id; pushing new row */
const markAsNotEmpty = (store, index, id) => {
  store.dispatch(change('insightsTable', `insights[${index}].isEmpty`, false));
  store.dispatch(
    change('insightsTable', `insights[${index}].id`, `newInsight-${id}`)
  );
};

const addNewInsight = store => {
  store.dispatch(
    arrayPush('insightsTable', 'insights', {
      isEmpty: true,
      isCreated: true,
      isActive: true,
      impact: 0,
      description: '',
    })
  );
};

export default store => next => action => {
  if ('meta' in action && action.meta.form === 'insightsTable') {
    const { form } = { ...store.getState() };

    /* Handle adding empty row at the first time */
    if (
      action.type === actionTypes.REGISTER_FIELD &&
      action.payload.name === 'insights'
    ) {
      addNewInsight(store);
    }

    /* Row gets order on setting category */
    /* and is marked as not empty if it containf all fields */
    if (
      action.type === actionTypes.CHANGE &&
      action.meta.field.includes('categoryId')
    ) {
      const index = action.meta.field.match(/\d{1,}/);
      const insight = form.insightsTable.values.insights[index];

      if (insight.isEmpty) {
        const sameCategory = form.insightsTable.values.insights.filter(
          item => item.categoryId === action.payload
        );

        store.dispatch(
          change(
            'insightsTable',
            `insights[${index}].order`,
            sameCategory.length + 1
          )
        );
      }
    }

    /* Row is marked as not empty if it containf all fields */
    if (
      action.type === actionTypes.BLUR &&
      action.meta.field.includes('insight')
    ) {
      const index = action.meta.field.match(/\d{1,}/);
      const insight = form.insightsTable.values.insights[index];
      const newInsights = form.insightsTable.values.insights.filter(
        item => item.isCreated
      );

      if (insight.isEmpty) {
        if (insight.insight && insight.insight.length > 0) {
          markAsNotEmpty(store, index, newInsights.length);
          addNewInsight(store);
        }
      }
    }
  }

  next(action);
};
