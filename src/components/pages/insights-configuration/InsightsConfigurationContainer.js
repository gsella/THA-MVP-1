import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import InsightsConfiguration from './InsightsConfiguration';

const mapStateToProps = (state) => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
  updateChartData: actions.updateChartData,
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
  deleteInsight: actions.deleteInsight,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightsConfiguration);