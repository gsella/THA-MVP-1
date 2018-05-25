import { connect } from 'react-redux';
import InsightsTools from './InsightsTools';
import { reduxForm, formValueSelector } from 'redux-form';
import categoryFroupConstants from 'constants/categoryGroupConstants';
import {
  getInsights,
  updateInsights,
} from '../../../redux/modules/insights/insightsActions';
import { getThunderName } from 'helper/thunderHelper';

const mapStateToProps = state => {
  const groupingDropdownSelector = formValueSelector('dropdownByGroup');

  return {
    groupId: groupingDropdownSelector(state, 'groupId'),
    items: categoryFroupConstants,
    thunderName: getThunderName(
      state.thunders,
      state.thunders.currentThunderKey
    ),
  };
};

const mapDispatchToProps = {
  getInsights,
  updateInsights,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsTools);

export default reduxForm({
  form: 'dropdownByGroup',
  enableReinitialize: true,
})(Container);
