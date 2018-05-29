import * as thundersApi from 'api/thundersApi';
import { mapThundersFromApi } from 'helper/apiDataMapper';
import { GET_THUNDERS, SET_THUNDERS_PENDING } from './thundersActionConstants';

export const getThunders = () => async (dispatch, getState) => {
  dispatch({ type: SET_THUNDERS_PENDING, payload: true });

  const response = await thundersApi.getThunders();

  if (response.status === 200) {
    dispatch({
      type: GET_THUNDERS,
      payload: response.data.map(mapThundersFromApi),
    });

    dispatch({ type: SET_THUNDERS_PENDING, payload: false });
  }
};
