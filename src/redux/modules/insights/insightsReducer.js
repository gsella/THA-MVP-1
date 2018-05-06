import { GET_INSIGHTS } from './insightsActionConstants';

const defaultState = {
  insights: []
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_INSIGHTS:
      return handleGetInsights(state, payload);

    default:
      return state;
  }
}

function handleGetInsights(state, insights) {
  return { ...state, insights };
}
