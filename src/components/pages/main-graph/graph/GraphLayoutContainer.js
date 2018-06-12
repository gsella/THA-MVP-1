import { connect } from 'react-redux';
import GraphLayout from './GraphLayout';
import { insightsKeySelector } from '../../../../redux/selectors/insightsKeySelector';
import { setGraphCellExpandCounter } from 'redux/modules/graphPage/graphPageActions';

const mapStateToProps = state => ({
  tags: state.tags.tags,
  categories: state.categories.categories,
  insights: insightsKeySelector(
    state.insights.insights,
    state.categories.categories
  ),
  hiddenInsights: state.graphPage.hiddenInsights,
  graphCellExpandCounter: state.graphPage.graphCellExpandCounter,
  isCellCounterInitialized: state.graphPage.isCellCounterInitialized,
});

const mapDispatchToProps = {
  setGraphCellExpandCounter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphLayout);
