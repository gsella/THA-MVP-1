import { GET_INSIGHTS, GET_INSIGHTS_PENDING } from './insightsActionConstants';

const defaultState = {
  insights: [],
  isDataLoading: true,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_INSIGHTS:
      return handleGetInsights(state, payload);
    case GET_INSIGHTS_PENDING:
      return handleLoadingData(state, payload);

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
