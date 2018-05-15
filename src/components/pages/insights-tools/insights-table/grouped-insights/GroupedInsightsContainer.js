import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import GroupedInsights from './GroupedInsights';
import { insightsKeySelector } from '../../../../../redux/selectors/insightsKeySelector';

const insightsTableSelector = formValueSelector('insightsTable');
const groupingDropdownSelector = formValueSelector('dropdownByGroup');

const mapStateToProps = state => {
  return {
    formValues: insightsKeySelector(
      insightsTableSelector(state, 'insights'),
      state.categories.categories
    ),
    tags: state.tags.tags,
    categories: state.categories.categories,
    groupId: groupingDropdownSelector(state, 'groupId'),
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
  };
};

export default connect(mapStateToProps)(GroupedInsights);
