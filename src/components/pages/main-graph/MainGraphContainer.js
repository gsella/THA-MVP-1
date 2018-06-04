import { connect } from 'react-redux';
import MainGraph from './MainGraph';
import { refreshThunder } from 'redux/modules/graphPage/graphPageActions';
import { getInsights } from '../../../redux/modules/insights/insightsActions';
import { insightsKeySelector } from '../../../redux/selectors/insightsKeySelector';
import { formValueSelector } from 'redux-form';
import { lastUpdatedInMilliseconds } from 'redux/selectors/lastUpdatedInsight';

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
    isRefresh: state.graphPage.isRefresh,
    isDataLoading: state.insights.isDataLoading,
    lastUpdatedInMilliseconds: lastUpdatedInMilliseconds(
      state.insights.insights
    ),
    selectedDate: mainGraphDatepickersSelector(state, 'selectedDate'),
  };
};

const mapDispatchToProps = {
  getInsights,
  refreshThunder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainGraph);
