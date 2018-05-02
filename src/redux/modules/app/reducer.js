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

    default:
      return state;
  }
}

function handleGetChartData(state, chartData) {
  return { ...state, chartData };
}

function handleGetMatchingData(state, matchingData) {
  return { ...state, chartData: matchingData };
}

function handleUpdateChartData(state, updatedInsight) {
  const newData = state.chartData.bubbles.map((item) => {
    if (item.id === updatedInsight.id) {
      return updatedInsight;
    }
    return item;
  })
  
  return {...state, chartData: {...state.chartData, bubbles:  updateCategoryKey(newData, state.chartData.categories)}}
}

function handleAddNewInsight(state, newInsight) {
  const newBubblesData = [].concat(state.chartData.bubbles);
  const newId = findMaxIndex(state.chartData.bubbles) + 1;

  newBubblesData.push({id: newId, ...newInsight});

  return {...state, chartData: {...state.chartData, bubbles: newBubblesData}}
}

function handleMoveInsightUp(state, id) {
  if (id > 1) {
    const newData = state.chartData.bubbles.map((item) => {
      if (item.id === id) return {...item, id: id - 1};
      if (item.id === id - 1) return {...item, id: id};
      return item;
    });

    return {...state, chartData: {...state.chartData, bubbles:  updateCategoryKey(newData, state.chartData.categories)}}
    
  }
  return state;
}

function handleMoveInsightDown(state, id) {
  if (id < findMaxIndex(state.chartData.bubbles)) {
    const newData = state.chartData.bubbles.map((item) => {
      if (item.id === id) return {...item, id: id + 1};
      if (item.id === id + 1) return {...item, id: id};
      return item;
    });

    return {...state, chartData: {...state.chartData, bubbles:  updateCategoryKey(newData, state.chartData.categories)}}
  }

  return state;
}

function handleDeleteInsight(state, id) {
  const newData = state.chartData.bubbles.filter((item) => {
    return (item.id !== id)
  }).map((item) => {
    if (item.id > id) return {...item, id: item.id - 1};
    return item;
  });

  return {...state, chartData: {...state.chartData, bubbles: updateCategoryKey(newData, state.chartData.categories)}}
}

function findMaxIndex(arr) {
  let max = 0;

  arr.forEach(element => {
    if (max < element.id) max=element.id;
  });

  return max;
}

function updateCategoryKey(arr, categories) {
  const categoriesArray = [];
  
  Object.keys(categories).forEach((key) => {
    categoriesArray[key]=0;
  });

  return arr.sort((a,b) => {return a.id - b.id}).map((item) => {
    if (item.categoryId > 0) {
      categoriesArray[item.categoryId] += 1;
    return {...item, categoryKey: `${categories[item.categoryId].name[0]}${categoriesArray[item.categoryId]}`}
    }
    return item;
  });
}