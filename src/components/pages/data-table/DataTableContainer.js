import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import DataTable from './DataTable';

const mapStateToProps = (state) => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = {
  getChartData: actions.getChartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);