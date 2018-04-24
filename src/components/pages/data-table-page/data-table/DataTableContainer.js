import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux/modules/app/actions';
import DataTable from './DataTable';

const mapStateToProps = (state) => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getChartData: actions.getChartData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);