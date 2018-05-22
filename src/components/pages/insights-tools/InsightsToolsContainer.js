import { connect } from 'react-redux';
import InsightsTools from './InsightsTools';
import { reduxForm, formValueSelector } from 'redux-form';
import categoryFroupConstants from 'constants/categoryGroupConstants';
import {
  getInsights,
  updateInsights,
} from '../../../redux/modules/insights/insightsActions';

const mapStateToProps = state => {
  const groupingDropdownSelector = formValueSelector('dropdownByGroup');

  return {
    groupId: groupingDropdownSelector(state, 'groupId'),
    items: categoryFroupConstants,
  };
};

const mapDispatchToProps = {
  getInsights,
  updateInsights,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTools);

export default reduxForm({
  form: 'dropdownByGroup',
  enableReinitialize: true,
})(Container);
