import { connect } from 'react-redux';
import TableRow from './TableRow';
import { formValueSelector } from 'redux-form';
import { deleteInsight } from '../../../../../redux/modules/insights/insightsActions';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = (state, props) => {
  return {
    item: insightsTableSelector(state, props.namePrefix),
  };
};

const mapDispatchToProps = {
  deleteInsight,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
