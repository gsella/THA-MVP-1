import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import InsightsTable from './InsightsTable';

const mapStateToProps = (state) => ({
  chartData: state.app.chartData,
  matchingData: state.app.matchingData,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
  updateChartData: actions.updateChartData,
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
  deleteInsight: actions.deleteInsight,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightsTable);