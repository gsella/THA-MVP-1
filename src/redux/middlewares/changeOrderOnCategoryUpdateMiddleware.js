import { actionTypes, change } from 'redux-form';

export default store => next => action => {
  if (
    action.type === actionTypes.CHANGE &&
    action.meta.form === 'insightsTable' &&
    action.meta.field.includes('categoryId')
  ) {
    const { form } = store.getState();
    const index = action.meta.field.match(/\d+/);
    const insight = form.insightsTable.values.insights[index];
    const newCategory = form.insightsTable.values.insights.filter(
      item => item.categoryId === action.payload
    );

    store.dispatch(
      change(
        'insightsTable',
        `insights[${index}].order`,
        newCategory.length + 1
      )
    );

    form.insightsTable.values.insights.forEach((item, index) => {
      if (
        item.categoryId === insight.categoryId &&
        item.order > insight.order
      ) {
        store.dispatch(
          change('insightsTable', `insights[${index}].order`, item.order - 1)
        );
      }
    });
  }

  next(action);
};
