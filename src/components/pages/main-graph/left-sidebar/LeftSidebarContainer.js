import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = state => ({
  chartData: state.app.chartData,
  hiddenInsights: state.app.hiddenInsights,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
