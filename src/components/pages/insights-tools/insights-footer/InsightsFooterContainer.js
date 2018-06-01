import { connect } from 'react-redux';
import InsightsFooter from './InsightsFooter';

const mapStateToProps = state => {
  return {
    isLaunching: state.insightsPage.isLaunching,
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InsightsFooter);
