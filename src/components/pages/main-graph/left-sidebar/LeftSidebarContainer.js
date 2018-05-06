import { connect } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  insights: state.insights.insights,
  hiddenInsights: state.app.hiddenInsights,
});

const mapDispatchToProps = {
  getInsights,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
