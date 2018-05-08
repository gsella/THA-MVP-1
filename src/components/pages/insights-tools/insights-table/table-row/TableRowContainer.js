import { connect } from 'react-redux';
import TableRow from './TableRow';
import { change } from 'redux-form';

const mapDispatchToProps = dispatch => ({
  deleteInsight: namePrefix =>
    dispatch(change('insightsTable', `${namePrefix}.isActive`, false)),
});

export default connect(null, mapDispatchToProps)(TableRow);
