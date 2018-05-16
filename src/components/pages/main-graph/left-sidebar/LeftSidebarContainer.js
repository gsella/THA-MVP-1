import { connect } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../../redux/selectors/insightsKeySelector';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  insights: insightsKeySelector(
    state.insights.insights,
    state.categories.categories
  ),
  hiddenInsights: state.app.hiddenInsights,
});

const mapDispatchToProps = {
  getInsights,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
