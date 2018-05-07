import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { createSelector } from 'reselect';
import * as actions from 'redux/modules/app/actions';
import InsightsTable from './InsightsTable';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';

const insightsArrayToObject = array => {
  if (!array.length) return {};

  return {
    insights: array.map(item => ({
      id: item.id,
      categoryId: item.categoryId,
      tagId: item.tagId,
      insight: item.insight,
      description: item.description,
      impact: 0,
    })),
  };
};

const initialValuesSelector = createSelector(
  state => state.insights.insights,
  insightsArrayToObject
);

const mapStateToProps = state => {
  const { insights } = state.insights;

  return {
    tags: state.tags.tags,
    categories: state.categories.categories,
    insights,
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
    initialValues: initialValuesSelector(state),
  };
};

const mapDispatchToProps = {
  getInsights,
  updateChartData: actions.updateChartData,
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
  deleteInsight: actions.deleteInsight,
  changeFormValue: change,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true,
})(Container);
