import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import Insight from './Insight';

const mapDispatchToProps = {
  hidingInsight: actions.hidingInsight,
};

export default connect(null, mapDispatchToProps)(Insight);
