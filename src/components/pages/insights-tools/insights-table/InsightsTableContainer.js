import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import InsightsTable from './InsightsTable';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';

const insightsArrayToObject = array => {
  if (!array.length) return {};

  return {
    insights: array.map(item => ({
      ...item,
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
    initialValues: initialValuesSelector(state),
    formValues: insightTableSelector(state, 'insights'),
  };
};

const mapDispatchToProps = {
  getInsights,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true,
})(Container);
