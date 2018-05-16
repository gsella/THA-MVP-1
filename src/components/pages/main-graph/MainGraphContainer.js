import { connect } from 'react-redux';
import * as actions from 'redux/modules/app/actions';
import MainGraph from './MainGraph';
import {
  getInsights,
  getNewInsights,
} from '../../../redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../redux/selectors/insightsKeySelector';
import { formValueSelector } from 'redux-form';

const mapStateToProps = state => {
  const mainGraphDatepickersSelector = formValueSelector(
    'mainGraphDatepickers'
  );

  return {
    insights: insightsKeySelector(
      state.insights.insights,
      state.categories.categories
    ),
    newInsights: state.insights.newInsights,
    isRefresh: state.app.isRefresh,
    isDataLoading: state.insights.isDataLoading,
    selectedDate: mainGraphDatepickersSelector(state, 'selectedDate'),
  };
};

const mapDispatchToProps = {
  getInsights,
  getNewInsights,
  refreshThunder: actions.refreshThunder,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
