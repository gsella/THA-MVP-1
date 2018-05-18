import {
  GET_INSIGHTS,
  SET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
  UPDATE_INSIGHTS,
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
    case SET_INSIGHTS_PENDING:
      return handleLoadingData(state, payload);
    case GET_NEW_INSIGHTS:
      return { ...state, newInsights: payload };
    case UPDATE_INSIGHTS:
      return handleUpdateInsihgts(state, payload);
    default:
      return state;
  }
}

function handleLoadingData(state, isDataLoading) {
  return { ...state, isDataLoading };
}

function handleGetInsights(state, insights) {
  return { ...state, insights };
}

function handleUpdateInsihgts(state, updatedInsights) {
  const insights = [...state.insights].map(oldInsight => {
    const updatedInsight = updatedInsights.find(i => i.id === oldInsight.id);

    return updatedInsight || oldInsight;
  });

  return {
    ...state,
    insights,
  };
}
