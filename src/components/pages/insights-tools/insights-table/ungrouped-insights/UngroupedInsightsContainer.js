import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import UngroupedInsights from './UngroupedInsights';
import { insightsKeySelector } from '../../../../../redux/selectors/insightsKeySelector';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = state => {
  return {
    categoryKeys: insightsKeySelector(
      insightsTableSelector(state, 'insights'),
      state.categories.categories
    ),
    tags: state.tags.tags,
    categories: state.categories.categories,
    searchQuery:
      'values' in state.form.searchForm
        ? state.form.searchForm.values.searchForm.trim()
        : '',
  };
};

export default connect(mapStateToProps)(UngroupedInsights);
