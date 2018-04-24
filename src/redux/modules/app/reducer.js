import ACTION_CONSTANTS from './constants';

const defaultState = {
  chartData: {},
};

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case ACTION_CONSTANTS.GET_CHART_DATA:
      return handleGetChartData(state, payload);
    case ACTION_CONSTANTS.GET_MATCHING_DATA:
      return handleGetMatchingData(state, payload);

    default:
      return state;
  }
};

function handleGetChartData(state, chartData) {
  return { ...state, chartData };
}

function handleGetMatchingData(state, matchingData) {
  return { ...state, chartData: matchingData };
}
