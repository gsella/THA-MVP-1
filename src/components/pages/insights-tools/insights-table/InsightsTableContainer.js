import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import InsightsTable from './InsightsTable';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';
import { getCategories } from '../../../../redux/modules/categories/categoriesActions';
import { getTags } from '../../../../redux/modules/tags/tagsActions';
import { sortInsightsByCategoryAndOrder } from '../../../../helper/apiDataSorter';

const insightsArrayToObject = (insights, newInsights) => {
  if (!insights.length && !newInsights.length) return {};

  return {
    insights: insights.concat(newInsights).map(item => ({
      ...item,
      isNew: item.isNew ? item.isNew : false,
      isUpdated: false,
    })),
  };
};

const initialValuesSelector = createSelector(
  state => state.insights.insights,
  state => state.insights.newInsights,
  insightsArrayToObject
);

const mapStateToProps = state => {
  const { insights } = state.insights;
  const insightTableSelector = formValueSelector('insightsTable');

  return {
    tags: state.tags.tags,
    categories: state.categories.categories,
    insights,
    initialValues: initialValuesSelector(state),
    formValues: insightTableSelector(state, 'insights')
      ? insightTableSelector(state, 'insights').sort(
          sortInsightsByCategoryAndOrder(state.categories.categories)
        )
      : insightTableSelector(state, 'insights'),
    selectedDate:
      'mainGraphDatepickers' in state.form
        ? state.form.mainGraphDatepickers.values.selectedDate
        : new Date(),
  };
};

const mapDispatchToProps = {
  getInsights,
  getTags,
  getCategories,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true,
})(Container);
