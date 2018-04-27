import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import MainGraph from './MainGraph';

const mapStateToProps = state => ({
  chartData: state.app.chartData,
  newInsights: state.app.newInsights,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
  getNewInsights: actions.getNewInsights,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
