import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import * as actions from 'redux/modules/app/actions';
import InsightsTable from './InsightsTable';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';

const insightsArrayToObject = array => {
  const arr = array.reduce((obj, item) => {
    obj[`categoryId-${item.id}`] = item.categoryId;
    obj[`tagId-${item.id}`] = item.tagId;
    obj[`insight-${item.id}`] = item.insight;
    obj[`description-${item.id}`] = item.description;
    obj[`impact-${item.id}`] = 0;
    return obj;
  }, {});

  return arr;
};

const mapStateToProps = state => {
  return {
    tags: state.tags.tags,
    chartData: state.app.chartData,
    insightsFormData: state.form.insightsTable
      ? state.form.insightsTable.values
      : {},
    searchQuerry:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
    initialValues:
      state.app.chartData && state.app.chartData.bubbles
        ? insightsArrayToObject(state.app.chartData.bubbles)
        : {}
  };
};

const mapDispatchToProps = {
  getInsights,
  updateChartData: actions.updateChartData,
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
  deleteInsight: actions.deleteInsight,
  changeFormValue: change
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true
})(Container);
