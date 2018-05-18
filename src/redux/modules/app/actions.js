import { format } from 'date-fns';
import ACTION_CONSTANTS from './constants';
import * as insightsApi from '../../../api/insightsApi';
import {
  GET_INSIGHTS,
  GET_NEW_INSIGHTS,
} from '../insights/insightsActionConstants';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import { sortInsightsByCategoryAndOrder } from '../../../helper/apiDataSorter';

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

export const refreshThunder = (
  thunderkey = 4,
  selectedDate = new Date()
) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_CONSTANTS.PRELOADER,
    payload: true,
  });

  const insightsResponse = await insightsApi.getInsights(
    thunderkey,
    format(selectedDate, 'YYYY-MM-DD')
  );

  const newInsightsResponse = await insightsApi.getNewInsights(
    thunderkey,
    format(selectedDate, 'YYYY-MM-DD'),
    format(new Date(), 'YYYY-MM-DD')
  );
  const { categories } = getState().categories;

  if (insightsResponse.status === 200 && newInsightsResponse.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: insightsResponse.data
        .map(mapInsightFromApi)
        .sort(sortInsightsByCategoryAndOrder(categories)),
    });
  }

  dispatch({
    type: GET_NEW_INSIGHTS,
    payload: newInsightsResponse.data
      .map(mapInsightFromApi)
      .map(a => ({ ...a, isNew: true })),
  });

  dispatch({
    type: ACTION_CONSTANTS.PRELOADER,
    payload: false,
  });
};
