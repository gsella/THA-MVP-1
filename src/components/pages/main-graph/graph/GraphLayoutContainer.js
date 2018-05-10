import { connect } from 'react-redux';
import GraphLayout from './GraphLayout';

const mapStateToProps = state => ({
  tags: state.tags.tags,
  categories: state.categories.categories,
  insights: state.insights.insights,
  hiddenInsights: state.app.hiddenInsights,
});

export default connect(mapStateToProps, null)(GraphLayout);
