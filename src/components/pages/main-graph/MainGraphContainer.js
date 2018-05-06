import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import MainGraph from './MainGraph';
import { getInsights } from '../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => ({
  tags: state.tags.tags,
  chartData: state.app.chartData,
  newInsights: state.app.newInsights,
  isRefresh: state.app.isRefresh
});

const mapDispatchToProps = {
  getInsights,
  getNewInsights: actions.getNewInsights,
  refreshThunder: actions.refreshThunder
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
