import { connect } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => ({
  chartData: state.app.chartData,
  hiddenInsights: state.app.hiddenInsights
});

const mapDispatchToProps = {
  getInsights
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
