import { connect } from 'react-redux';
import * as actions from 'redux/modules/graphPage/graphPageActions';
import Insight from './Insight';

const mapDispatchToProps = {
  hideInsight: actions.hideInsight,
};

export default connect(null, mapDispatchToProps)(Insight);
