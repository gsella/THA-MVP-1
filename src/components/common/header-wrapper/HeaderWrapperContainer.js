import { connect } from 'react-redux';
import { getThunders } from 'redux/modules/thunders/thundersActions';
import HeaderWrapper from './HeaderWrapper';

const mapDispatchToProps = { getThunders };

export default connect(
  null,
  mapDispatchToProps
)(HeaderWrapper);
