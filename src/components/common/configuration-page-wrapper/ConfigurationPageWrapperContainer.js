import { connect } from 'react-redux';
import * as actions from 'redux/modules/insights/insightsActions';
import ConfigurationPageWrapper from './ConfigurationPageWrapper';

const mapDispatchToProps = {
  updateInsights: actions.updateInsights,
};

export default connect(null, mapDispatchToProps)(ConfigurationPageWrapper);
