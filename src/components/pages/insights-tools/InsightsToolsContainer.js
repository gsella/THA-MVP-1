import { connect } from 'react-redux';
import InsightsTools from './InsightsTools';
import { reduxForm, formValueSelector } from 'redux-form';
import categoryFroupConstants from 'constants/categoryGroupConstants';
import {
  getInsights,
  updateInsights,
} from '../../../redux/modules/insights/insightsActions';
import { getThunders } from 'redux/modules/thunders/thundersActions';

const mapStateToProps = state => {
  const groupingDropdownSelector = formValueSelector('dropdownByGroup');

  const thunderKey = state.thunders.currentThunderKey;
  const findThunder = thunder => {
    return thunder.thunderKey === thunderKey;
  };

  return {
    groupId: groupingDropdownSelector(state, 'groupId'),
    items: categoryFroupConstants,
    currentThunder: state.thunders.activeThunders.find(findThunder) || {},
  };
};

const mapDispatchToProps = {
  getInsights,
  updateInsights,
  getThunders,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(InsightsTools);

export default reduxForm({
  form: 'dropdownByGroup',
  enableReinitialize: true,
})(Container);
