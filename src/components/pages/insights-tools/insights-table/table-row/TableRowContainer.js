import { connect } from 'react-redux';
import TableRow from './TableRow';
import { change, formValueSelector } from 'redux-form';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = (state, props) => {
  return {
    item: insightsTableSelector(state, props.namePrefix),
  };
};

const mapDispatchToProps = dispatch => ({
  deleteInsight: namePrefix =>
    dispatch(change('insightsTable', `${namePrefix}.isActive`, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
