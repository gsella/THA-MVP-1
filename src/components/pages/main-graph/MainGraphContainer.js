import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import MainGraph from './MainGraph';
import { getInsights } from '../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => ({
  insights: state.insights.insights,
  newInsights: state.app.newInsights,
  isRefresh: state.app.isRefresh,
  isDataLoading: state.insights.isDataLoading,
});

const mapDispatchToProps = {
  getInsights,
  getNewInsights: actions.getNewInsights,
  refreshThunder: actions.refreshThunder,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
