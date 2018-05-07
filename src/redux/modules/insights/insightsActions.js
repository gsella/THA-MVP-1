import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import { GET_INSIGHTS, GET_INSIGHTS_PENDING } from './insightsActionConstants';

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
