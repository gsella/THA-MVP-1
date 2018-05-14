import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import * as actions from 'redux/modules/app/actions';
import InsightsTable from './InsightsTable';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../../redux/selectors/insightsKeySelector';

const insightsArrayToObject = array => {
  if (!array.length) return {};

  return {
    insights: array.map(item => ({
      ...item,
      impact: 0,
      isActive: true,
      isUpdated: false,
    })),
  };
};

const initialValuesSelector = createSelector(
  state => state.insights.insights,
  insightsArrayToObject
);

const mapStateToProps = state => {
  const { insights } = state.insights;
  const insightTableSelector = formValueSelector('insightsTable');

  return {
    tags: state.tags.tags,
    categories: state.categories.categories,
    insights,
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
    initialValues: initialValuesSelector(state),
    formValues: insightsKeySelector(
      insightTableSelector(state, 'insights'),
      state.categories.categories
    ),
  };
};

const mapDispatchToProps = {
  getInsights,
  //moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true,
})(Container);
