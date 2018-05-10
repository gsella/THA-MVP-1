import ACTION_CONSTANTS from './constants';
import * as insightsApi from '../../../api/insightsApi';
import { GET_NEW_INSIGHTS } from '../insights/insightsActionConstants';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';

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

export const refreshThunder = (thunderkey = 4) => async (
  dispatch,
  getState
) => {
  const isRefresh = { ...getState().app }.isRefresh;

  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: ACTION_CONSTANTS.REFRESH_THUNDER,
      payload: response.data.map(mapInsightFromApi),
    });
  }

  dispatch({
    type: ACTION_CONSTANTS.PRELOADER,
    payload: !isRefresh,
  });

  dispatch({
    type: GET_NEW_INSIGHTS,
    payload: [],
  });

  setTimeout(
    () =>
      dispatch({
        type: ACTION_CONSTANTS.PRELOADER,
        payload: isRefresh,
      }),
    1000
  );
};
