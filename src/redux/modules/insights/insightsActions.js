import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import {
  GET_INSIGHTS,
  GET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
} from './insightsActionConstants';
import { change } from 'redux-form';
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

export const moveInsightUp = (id, categoryId) => (dispatch, getState) => {
  const insights = getState().form.insightsTable.values.insights;

  const insightsByCurrentId = insights.find(item => item.id === id);

  const currentOrder = insightsByCurrentId.order;

  const filteredInsightsByCategory = insights
    .filter(a => a.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);

  const currentIndexInCategory = filteredInsightsByCategory.indexOf(
    insightsByCurrentId
  );

  if (currentIndexInCategory === 0) return;

  const prevItem = filteredInsightsByCategory[currentIndexInCategory - 1];

  const prevIndex = insights.indexOf(prevItem);

  const prevOrder = insights[prevIndex].order;

  dispatch(
    change(
      'insightsTable',
      `insights[${insights.indexOf(insightsByCurrentId)}].order`,
      prevOrder
    )
  );
  dispatch(
    change('insightsTable', `insights[${prevIndex}].order`, currentOrder)
  );
};

export const moveInsightDown = (
  id,
  filterInsightsByCategoryLength,
  categoryId
) => (dispatch, getState) => {
  const insights = getState().form.insightsTable.values.insights;

  const insightsByCurrentId = insights.find(item => item.id === id);

  const currentOrder = insightsByCurrentId.order;

  const filteredInsightsByCategory = insights
    .filter(a => a.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);

  const currentIndexInCategory = filteredInsightsByCategory.indexOf(
    insightsByCurrentId
  );

  if (filteredInsightsByCategory.length - 1 === currentIndexInCategory) return;

  const nextItem = filteredInsightsByCategory[currentIndexInCategory + 1];

  const nextIndex = insights.indexOf(nextItem);

  const nextOrder = insights[nextIndex].order;

  dispatch(
    change(
      'insightsTable',
      `insights[${insights.indexOf(insightsByCurrentId)}].order`,
      nextOrder
    )
  );
  dispatch(
    change('insightsTable', `insights[${nextIndex}].order`, currentOrder)
  );
};
