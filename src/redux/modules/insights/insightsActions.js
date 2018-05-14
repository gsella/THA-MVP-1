import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import {
  GET_INSIGHTS,
  GET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
} from './insightsActionConstants';
import history from 'components/containers/history';
import { sortInsightsByCategoryAndOrder } from '../../../helper/apiDataSorter';

export const getInsights = (thunderkey = 4, date) => async (
  dispatch,
  getState
) => {
  dispatch({ type: GET_INSIGHTS_PENDING, payload: true });
  const { categories } = getState().categories;

  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: {
        insights: response.data
          .map(mapInsightFromApi)
          .sort(sortInsightsByCategoryAndOrder(categories)),
        isDataLoading: false,
      },
    });
  }
};

export const getNewInsights = date => dispatch => {
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

export const updateInsights = () => (dispatch, getState) => {
  history.push('/main-graph');

  const insights = [...getState().form.insightsTable.values.insights];
  const updatedInsights = insights.filter(item => item.isUpdated);

  console.log(updatedInsights);
};
