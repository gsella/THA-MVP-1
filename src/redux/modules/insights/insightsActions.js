import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import { GET_INSIGHTS } from './insightsActionConstants';

export const getInsights = (thunderkey = 4) => async dispatch => {
  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: response.data.map(mapInsightFromApi),
    });
  }
};
