import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import InsightsTools from './InsightsTools';

const mapStateToProps = (state) => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightsTools);