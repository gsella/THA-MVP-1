import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import GroupedInsights from './GroupedInsights';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = state => {
  return {
    formValues: insightsTableSelector(state, 'insights'),
    tags: state.tags.tags,
    categories: state.categories.categories,
    groupId: state.form.dropdownByGroup.values.groupId,
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
  };
};

export default connect(mapStateToProps)(GroupedInsights);
