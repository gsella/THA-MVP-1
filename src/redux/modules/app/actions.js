import ACTION_CONSTANTS from './constants';

export const updateChartData = (updatedInsight) => dispatch => {
  if (updatedInsight.tagId === 0 && 
      updatedInsight.categoryId === 0 && 
      updatedInsight.insight.trim().length === 0 &&
      updatedInsight.description.trim().length === 0
    ) {
    dispatch({
      type: ACTION_CONSTANTS.DELETE_INSIGHT,
      payload: updatedInsight.id,
    });  
  } else {
    if (updatedInsight.tagId > 0 && updatedInsight.categoryId > 0 && updatedInsight.insight.trim().length > 0) {
      updatedInsight.isNew = false;
    }
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CHART_DATA,
      payload: updatedInsight,
    });
  }
};

export const hidingInsight = key => (dispatch, getState) => {
  const hiddenInsights = [...getState().app.hiddenInsights];
  const index = hiddenInsights.findIndex(insight => insight === key);

  if (index === -1) {
    hiddenInsights.push(key);
  } else {
    hiddenInsights.splice(index, 1);
  }

  dispatch({
    type: ACTION_CONSTANTS.TOGGLE_VISIBLE_INSIGHT,
    payload: hiddenInsights,
  });
};

export const addNewInsight = () => dispatch => {
  dispatch({
    type: ACTION_CONSTANTS.ADD_NEW_INSIGHT,
    payload: newInsight,
  });
};

export const deleteInsight = id => dispatch => {
  dispatch({
    type: ACTION_CONSTANTS.DELETE_INSIGHT,
    payload: id,
  });
};

export const moveInsightUp = id => dispatch => {
  dispatch({
    type: ACTION_CONSTANTS.MOVE_INSIGHT_UP,
    payload: id,
  });
};

export const moveInsightDown = id => dispatch => {
  dispatch({
    type: ACTION_CONSTANTS.MOVE_INSIGHT_DOWN,
    payload: id,
  });
};

export const getChartData = () => dispatch => {
  // TODO: get data from server
  const data = {
    ...chartData,
    bubbles: chartData.bubbles.map(bubble => {
      bubble.isVisible = true;
      return bubble;
    }),
  };

  dispatch({
    type: ACTION_CONSTANTS.GET_CHART_DATA,
    payload: data,
  });
};

export const getMatchingData = (querry) => dispatch => {
  dispatch({
    type: ACTION_CONSTANTS.GET_MATCHING_DATA,
    payload: querry,
  });
};

export const getNewInsights = () => dispatch => {
  //TODO: request to server
  dispatch({
    type: ACTION_CONSTANTS.GET_NEW_INSIGHTS,
    payload: [{}],
  });
};

const newInsight = {
  categoryId: 0,
  tagId: 0,
  categoryKey: '',
  insight: 'Google Home',
  popularity: 0,
  instances: 0,
  description: '',
  isNew: true,
};

const chartData = {
  tags: {
    1: {
      name: 'PM',
    },
    2: {
      name: 'Challenges',
    },
    3: {
      name: 'Other Players',
    },
    4: {
      name: 'Marketing',
    },
    5: {
      name: 'Other Tag',
    },
    6: {
      name: 'Other',
    },
  },
  categories: {
    1: {
      name: 'KYC',
      color: '#22bae6',
    },
    2: {
      name: 'Features',
      color: '#d92be5',
    },
    3: {
      name: 'Competition',
      color: '#0fb54a',
    },
  },
  bubbles: [
    {
      id: 1,
      categoryId: 1,
      tagId: 6,
      categoryKey: 'K1',
      insight: 'Home Use',
      popularity: 1,
      instances: 5,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      categoryId: 1,
      tagId: 4,
      categoryKey: 'K2',
      insight: 'Music Use',
      popularity: 0,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 3,
      categoryId: 1,
      tagId: 3,
      categoryKey: 'K3',
      insight: 'Office Use',
      popularity: -1,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 4,
      categoryId: 1,
      tagId: 1,
      categoryKey: 'K4',
      insight: 'Kids Use',
      popularity: 1,
      instances: 3,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 5,
      categoryId: 2,
      tagId: 3,
      categoryKey: 'F1',
      insight: 'Speakers',
      popularity: 0,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 6,
      categoryId: 2,
      tagId: 2,
      categoryKey: 'F2',
      insight: 'Phone',
      popularity: -1,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 7,
      categoryId: 2,
      tagId: 3,
      categoryKey: 'F3',
      insight: 'Calendar',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 8,
      categoryId: 3,
      tagId: 5,
      categoryKey: 'C1',
      insight: 'Siri',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 9,
      categoryId: 3,
      tagId: 5,
      categoryKey: 'C2',
      insight: 'Google Home',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
  ],
};
