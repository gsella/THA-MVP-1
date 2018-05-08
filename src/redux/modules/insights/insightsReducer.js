import {
  GET_INSIGHTS,
  GET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
} from './insightsActionConstants';

const defaultState = {
  insights: [],
  newInsights: [],
  isDataLoading: true,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_INSIGHTS:
      return handleGetInsights(state, payload);
    case GET_INSIGHTS_PENDING:
      return handleLoadingData(state, payload);
    case GET_NEW_INSIGHTS:
      return { ...state, newInsights: payload };

    default:
      return state;
  }
}

function handleLoadingData(state, isDataLoading) {
  return { ...state, isDataLoading };
}

function handleGetInsights(state, { insights, isDataLoading }) {
  return { ...state, insights, isDataLoading };
}
