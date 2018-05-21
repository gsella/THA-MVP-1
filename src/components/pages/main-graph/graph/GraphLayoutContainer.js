import { connect } from 'react-redux';
import GraphLayout from './GraphLayout';
import { insightsKeySelector } from '../../../../redux/selectors/insightsKeySelector';

const mapStateToProps = state => ({
  tags: state.tags.tags,
  categories: state.categories.categories,
  insights: insightsKeySelector(
    state.insights.insights,
    state.categories.categories
  ),
  hiddenInsights: state.graphPage.hiddenInsights,
});

export default connect(mapStateToProps, null)(GraphLayout);
