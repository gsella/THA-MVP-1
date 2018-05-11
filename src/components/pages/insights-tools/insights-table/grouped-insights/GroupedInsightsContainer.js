import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import GroupedInsights from './GroupedInsights';

const insightsTableSelector = formValueSelector('insightsTable');

const mapStateToProps = state => {
  return {
    formValues: insightsTableSelector(state, 'insights'),
    tags: state.tags.tags,
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(GroupedInsights);
