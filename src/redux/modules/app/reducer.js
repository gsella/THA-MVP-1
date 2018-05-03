import ACTION_CONSTANTS from './constants';

const defaultState = {
  chartData: {},
  newInsights: [],
  hiddenInsights: [],
  matchingData: [],
  isRefresh: false,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case ACTION_CONSTANTS.GET_CHART_DATA:
      return handleGetChartData(state, payload);
    case ACTION_CONSTANTS.GET_MATCHING_DATA:
      return handleGetMatchingData(state, payload);
    case ACTION_CONSTANTS.GET_NEW_INSIGHTS:
      return handleGetNewInsights(state, payload);
    case ACTION_CONSTANTS.UPDATE_CHART_DATA:
      return handleUpdateChartData(state, payload);
    case ACTION_CONSTANTS.ADD_NEW_INSIGHT:
      return handleAddNewInsight(state, payload);
    case ACTION_CONSTANTS.MOVE_INSIGHT_UP:
      return handleMoveInsightUp(state, payload);
    case ACTION_CONSTANTS.MOVE_INSIGHT_DOWN:
      return handleMoveInsightDown(state, payload);
    case ACTION_CONSTANTS.DELETE_INSIGHT:
      return handleDeleteInsight(state, payload);
    case ACTION_CONSTANTS.TOGGLE_VISIBLE_INSIGHT:
      return handleToggleVisibleInsight(state, payload);
    case ACTION_CONSTANTS.REFRESH_THUNDER:
      return handleRefreshThunder(state, payload);
    case ACTION_CONSTANTS.PRELOADER:
      return handlePreloader(state, payload);

    default:
      return state;
  }
}

function handleGetChartData(state, chartData) {
  return { ...state, chartData };
}

function handleToggleVisibleInsight(state, hiddenInsights) {
  return { ...state, hiddenInsights };
}

function handleGetMatchingData(state, querry) {
  querry = querry.trim();

  if (querry.length > 0) {
    const matchingData = state.chartData.bubbles.filter(item => {
      if (item.insight.toLowerCase().indexOf(querry.toLowerCase()) > -1) return true
      else if (item.description.toLowerCase().indexOf(querry.toLowerCase()) > -1) return true
      else return false;
    });

    const matchingIds = matchingData.map(item => item.id);

    return { ...state, matchingData: matchingIds };
  } else return {...state, matchingData: []};
}

function handleUpdateChartData(state, updatedInsight) {
  const newData = [].concat(state.chartData.bubbles);
  let itemKey = -1;

  newData.forEach((item, key) => {
    if (item.id === updatedInsight.id) itemKey = key;
  });

  if (itemKey > -1) {
    newData[itemKey] = updatedInsight;
  } else {
    newData.push(updatedInsight);
  }

  return {...state, chartData: {...state.chartData, bubbles:  updateCategoryKey(newData, state.chartData.categories)}}
}

function handleAddNewInsight(state, newInsight) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  const newId = state.chartData.bubbles.length;

  newBubblesData.push({ id: newId, ...newInsight });

  return { ...state, chartData: { ...state.chartData, bubbles: newBubblesData } };
}

function handleMoveInsightUp(state, id) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  let itemKey = 0;

  newBubblesData.forEach((item, key) => {
    if (item.id === id) itemKey = key;
  });

  if (itemKey > 0) {
    const item = newBubblesData[itemKey];

    newBubblesData.splice(itemKey, 1);
    newBubblesData.splice(itemKey - 1, 0, item);

    return {...state, chartData: {...state.chartData, bubbles: updateCategoryKey(newBubblesData, state.chartData.categories)}}

  }
  return state;
}

function handleMoveInsightDown(state, id) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  let itemKey = 0;

  newBubblesData.forEach((item, key) => {
    if (item.id === id) itemKey = key;
  });

  if (itemKey < newBubblesData.length - 1) {
    const item = newBubblesData[itemKey];

    newBubblesData.splice(itemKey, 1);
    newBubblesData.splice(itemKey + 1, 0, item);

    return {...state, chartData: {...state.chartData, bubbles: updateCategoryKey(newBubblesData, state.chartData.categories)}}

  }
  return state;
}

function handleDeleteInsight(state, id) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  let itemKey = 0;

  newBubblesData.forEach((item, key) => {
    if (item.id === id) itemKey = key;
  });
  newBubblesData.splice(itemKey, 1);

  return {...state, chartData: {...state.chartData, bubbles: updateCategoryKey(newBubblesData, state.chartData.categories)}}
}

function updateCategoryKey(arr, categories) {
  const categoriesArray = [];

  Object.keys(categories).forEach((key) => {
    categoriesArray[key] = 0;
  });

  return arr.map((item) => {
    if (item.categoryId > 0) {
      categoriesArray[item.categoryId] += 1;
    return {...item, categoryKey: `${categories[item.categoryId].name[0]}${categoriesArray[item.categoryId]}`}
    }
    return item;
  });
}

function handleGetNewInsights(state, newInsights) {
  return { ...state, newInsights };
}

function handleRefreshThunder(state, chartData) {
  return { ...state, chartData }
}

function handlePreloader(state, isRefresh) {
  return { ...state, isRefresh };
}
