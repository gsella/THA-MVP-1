import { format } from 'date-fns';
import * as insightsApi from '../../../api/insightsApi';
import {
  mapInsightFromApi,
  mapInsightsFromPUTApi,
} from '../../../helper/apiDataMapper';
import {
  GET_INSIGHTS,
  SET_INSIGHTS_PENDING,
  GET_NEW_INSIGHTS,
  UPDATE_INSIGHTS,
} from './insightsActionConstants';
import { change } from 'redux-form';
import history from 'components/containers/history';
import { sortInsightsByCategoryAndOrder } from '../../../helper/apiDataSorter';
import delayPostRequest from 'helper/delayPostRequest';
import { setLaunching } from '../insightsPage/InsightsPageActions';

export const getInsights = (date, thunderkey = 4) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_INSIGHTS_PENDING, payload: true });
  const { categories } = getState().categories;

  const response = await insightsApi.getInsights(thunderkey, date);

  if (response.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: response.data
        .map(mapInsightFromApi)
        .sort(sortInsightsByCategoryAndOrder(categories)),
    });

    dispatch({ type: SET_INSIGHTS_PENDING, payload: false });
  }
};

export const updateInsights = () => async (dispatch, getState) => {
  dispatch(setLaunching(true));
  try {
    const thunderKey = 4;
    const insights = [...getState().form.insightsTable.values.insights].filter(
      i => !i.isEmpty
    );

    const createdInsights = getCreatedInsights(insights);
    const updatedInsights = insights.filter(item => item.isUpdated);

    let promises = [];

    const promisesPost = delayPostRequest(createdInsights);

    if (updatedInsights.length) {
      promises.push(insightsApi.updateInsights(thunderKey, updatedInsights));
    }

    promises = promises.concat(await promisesPost);

    const responses = await Promise.all(promises);

    if (updatedInsights.length) {
      const updatedInsights = responses[0].data.insights.map(
        mapInsightsFromPUTApi
      );

      dispatch({
        type: UPDATE_INSIGHTS,
        payload: updatedInsights,
      });
    }

    dispatch({
      type: GET_NEW_INSIGHTS,
      payload: [],
    });

    dispatch(setLaunching(false));

    history.push('/main-graph');
  } catch (e) {
    console.error("some response isn't successful", e);
    dispatch(setLaunching(false));
  }
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

function getCreatedInsights(insights) {
  const createdInsights = insights.filter(item => item.isCreated);

  return createdInsights.map(i => {
    i.insightDate = format(new Date(), 'YYYY-MM-DD');

    return i;
  });
}
