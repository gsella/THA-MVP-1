import { connect } from 'react-redux';
import InsightsTools from './InsightsTools';
import { getInsights } from '../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  getInsights
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightsTools);
