import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import {
  GET_INSIGHTS,
  GET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
} from './insightsActionConstants';

export const getInsights = (thunderkey = 4) => async dispatch => {
  dispatch({ type: GET_INSIGHTS_PENDING, payload: true });

  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: {
        insights: response.data.map(mapInsightFromApi),
        isDataLoading: false,
      },
    });
  }
};

export const getNewInsights = () => dispatch => {
  // TODO: get new insights from server
  const newInsights = [
    { id: 1, instances: 1, insight: 'Lever' },
    { id: 2, instances: 1, insight: 'Mench' },
    { id: 3, instances: 4, insight: 'Facebook' },
  ];

  setTimeout(
    () =>
      dispatch({
        type: GET_NEW_INSIGHTS,
        payload: newInsights,
      }),
    2000
  );
};
