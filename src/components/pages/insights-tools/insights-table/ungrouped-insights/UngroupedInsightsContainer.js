import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import UngroupedInsights from './UngroupedInsights';
import * as actions from 'redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../../../redux/selectors/insightsKeySelector';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = state => {
  return {
    categoryKeys: insightsKeySelector(
      insightsTableSelector(state, 'insights'),
      state.categories.categories
    ),
    formValues: insightsTableSelector(state, 'insights'),
    tags: state.tags.tags,
    categories: state.categories.categories,
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

export default connect(mapStateToProps, mapDispatchToProps)(UngroupedInsights);
