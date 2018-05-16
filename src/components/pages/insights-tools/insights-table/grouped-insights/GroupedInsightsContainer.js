import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import GroupedInsights from './GroupedInsights';
import * as actions from 'redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../../../redux/selectors/insightsKeySelector';

const insightsTableSelector = formValueSelector('insightsTable');
const groupingDropdownSelector = formValueSelector('dropdownByGroup');

const mapStateToProps = state => {
  return {
    categoryKeys: insightsKeySelector(
      insightsTableSelector(state, 'insights'),
      state.categories.categories
    ),
    formValues: insightsTableSelector(state, 'insights'),
    tags: state.tags.tags,
    categories: state.categories.categories,
    groupId: groupingDropdownSelector(state, 'groupId'),
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
  };
};

const mapDispatchToProps = {
  moveInsightUp: actions.moveInsightUp,
  moveInsightDown: actions.moveInsightDown,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupedInsights);
