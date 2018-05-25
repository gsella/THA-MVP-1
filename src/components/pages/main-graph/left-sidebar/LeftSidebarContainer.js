import { connect } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import { getInsights } from '../../../../redux/modules/insights/insightsActions';
import { hideCategory } from '../../../../redux/modules/graphPage/graphPageActions';
import { insightsKeySelector } from '../../../../redux/selectors/insightsKeySelector';
import { getThunderName } from 'helper/thunderHelper';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  insights: insightsKeySelector(
    state.insights.insights,
    state.categories.categories
  ),
  hiddenInsights: state.graphPage.hiddenInsights,
  thunderName: getThunderName(state.thunders, state.thunders.currentThunderKey),
});

const mapDispatchToProps = {
  getInsights,
  hideCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebar);
