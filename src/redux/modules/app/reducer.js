import ACTION_CONSTANTS from './constants';

const defaultState = {
  newInsights: [],
  hiddenInsights: [],
  showSearchResults: false,
  matchingData: [],
  isRefresh: false,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case ACTION_CONSTANTS.UPDATE_CHART_DATA:
      return handleUpdateChartData(state, payload);
    case ACTION_CONSTANTS.ADD_NEW_INSIGHT:
      return handleAddNewInsight(state, payload);
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

function handleToggleVisibleInsight(state, hiddenInsights) {
  return { ...state, hiddenInsights };
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

  return {
    ...state,
    chartData: {
      ...state.chartData,
      bubbles: updateCategoryKey(newData, state.chartData.categories),
    },
  };
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

function updateCategoryKey(arr, categories) {
  const categoriesArray = [];

  Object.keys(categories).forEach(key => {
    categoriesArray[key] = 0;
  });

  return arr.map(item => {
    if (item.categoryId > 0) {
      categoriesArray[item.categoryId] += 1;
      return {
        ...item,
        categoryKey: `${categories[item.categoryId].name[0]}${
          categoriesArray[item.categoryId]
        }`,
      };
    }
    return item;
  });
}

function handleRefreshThunder(state, chartData) {
  return { ...state, chartData };
}

function handlePreloader(state, isRefresh) {
  return { ...state, isRefresh };
}
