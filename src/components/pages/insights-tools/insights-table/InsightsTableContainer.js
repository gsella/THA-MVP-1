import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as actions from 'redux/modules/app/actions';
import InsightsTable from './InsightsTable';

const insightsArrayToObject = (array) => {
  const arr = array.reduce((obj, item) => {
    obj[`categoryId-${item.id}`] = item.categoryId;
    obj[`tagId-${item.id}`] = item.tagId;
    obj[`insight-${item.id}`] = item.insight;
    obj[`description-${item.id}`] = item.description;
    obj[`impact-${item.id}`] = 0;
    return obj
  }, {});

  return arr;
}

const mapStateToProps = (state) => {
  return {
    chartData: state.app.chartData,
    matchingData: state.app.matchingData,
    showSearchResults: state.app.showSearchResults,
    initialValues: state.app.chartData && state.app.chartData.bubbles ?
      insightsArrayToObject(state.app.chartData.bubbles) : {}
  }
};

const mapDispatchToProps = {
  getChartData: actions.getChartData,
  updateChartData: actions.updateChartData,
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
  deleteInsight: actions.deleteInsight,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTable);

export default reduxForm({
  form: 'insightsTable',
  enableReinitialize: true
})(Container);