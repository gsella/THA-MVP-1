import ACTION_CONSTANTS from './graphPageConstants';

const defaultState = {
  newInsights: [],
  hiddenInsights: {},
  showSearchResults: false,
  matchingData: [],
  isRefresh: false,
  graphCellExpandCounter: 0,
  isCellCounterInitialized: false,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case ACTION_CONSTANTS.ADD_NEW_INSIGHT:
      return handleAddNewInsight(state, payload);
    case ACTION_CONSTANTS.TOGGLE_VISIBLE_INSIGHT:
      return handleToggleVisibleInsight(state, payload);
    case ACTION_CONSTANTS.REFRESH_THUNDER:
      return handleRefreshThunder(state, payload);
    case ACTION_CONSTANTS.PRELOADER:
      return handlePreloader(state, payload);
    case ACTION_CONSTANTS.SET_SELL_EXPAND_COUNTER:
      return handleSetGraphCellExpandCounter(state, payload);

    default:
      return state;
  }
}

function handleToggleVisibleInsight(state, hiddenInsights) {
  return { ...state, hiddenInsights };
}

function handleAddNewInsight(state, newInsight) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  const newId = state.chartData.bubbles.length;

  newBubblesData.push({ id: newId, ...newInsight });

  return {
    ...state,
    chartData: { ...state.chartData, bubbles: newBubblesData },
  };
}

function handleRefreshThunder(state, chartData) {
  return { ...state, chartData };
}

function handlePreloader(state, isRefresh) {
  return {
    ...state,
    isRefresh,
    graphCellExpandCounter: 0,
    isCellCounterInitialized: false,
  };
}

function handleSetGraphCellExpandCounter(state, cellExpand) {
  return {
    ...state,
    graphCellExpandCounter: cellExpand.counter,
    isCellCounterInitialized: cellExpand.initStatus,
  };
}
