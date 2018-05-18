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

export const getInsights = (thunderkey = 4, date) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_INSIGHTS_PENDING, payload: true });
  const { categories } = getState().categories;

  const response = await insightsApi.getInsights(thunderkey);

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

export const getNewInsights = date => (dispatch, getState) => {
  const { categories } = getState().categories;

  // TODO: get new insights from server
  const newInsights = [
    {
      InsightKey: 35,
      InsightID: 'T1',
      InsightName: 'e-Signature; e-Sig; Electronic Signature',
      InsightScale: '0.0',
      InsightCategory: { InsightCategoryID: 5, InsightCategoryName: '' },
      InsightPopularity: 5,
      InsightSize: 4,
      InsightDescription:
        'eSig is a theme that we have been debating if to take action in',
      Words: {
        ListOfWords: { 'e-Signature; e-Sig; Electronic Signature': 1 },
      },
      Tagkey: 1,
      Categorykey: 5,
      ThunderKey: 4,
      InsightDate: '2018-01-01T00:00:00',
      InsightOrder: 5,
      isActive: true,
    },
    {
      InsightKey: 36,
      InsightID: 'T1',
      InsightName: 'e-Signature; e-Sig; Electronic Signature',
      InsightScale: '0.0',
      InsightCategory: { InsightCategoryID: 5, InsightCategoryName: '' },
      InsightPopularity: 5,
      InsightSize: 4,
      InsightDescription:
        'eSig is a theme that we have been debating if to take action in',
      Words: {
        ListOfWords: { 'e-Signature; e-Sig; Electronic Signature': 1 },
      },
      Tagkey: 1,
      Categorykey: 5,
      ThunderKey: 4,
      InsightDate: '2018-01-01T00:00:00',
      InsightOrder: 4,
      isActive: true,
    },
    {
      InsightKey: 37,
      InsightID: 'T1',
      InsightName: 'e-Signature; e-Sig; Electronic Signature',
      InsightScale: '0.0',
      InsightCategory: { InsightCategoryID: 5, InsightCategoryName: '' },
      InsightPopularity: 5,
      InsightSize: 4,
      InsightDescription:
        'eSig is a theme that we have been debating if to take action in',
      Words: {
        ListOfWords: { 'e-Signature; e-Sig; Electronic Signature': 1 },
      },
      Tagkey: 1,
      Categorykey: 5,
      ThunderKey: 4,
      InsightDate: '2018-01-01T00:00:00',
      InsightOrder: 3,
      isActive: true,
    },
  ];

  setTimeout(
    () =>
      dispatch({
        type: GET_NEW_INSIGHTS,
        payload: newInsights
          .map(mapInsightFromApi)
          .map(a => ({ ...a, isNew: true })),
      }),
    2000
  );
};

export const updateInsights = () => async (dispatch, getState) => {
  const thunderKey = 4;
  const insights = [...getState().form.insightsTable.values.insights].filter(
    i => !i.isEmpty
  );
  const createdInsights = insights.filter(item => item.isCreated);
  const updatedInsights = insights.filter(item => item.isUpdated);

  let promises = [];
  const promisesPost = createdInsights.map(insight => {
    return insightsApi.addInsight(insight);
  });

  if (updatedInsights.length) {
    promises.push(insightsApi.updateInsights(thunderKey, updatedInsights));
  }

  promises = promises.concat(promisesPost);

  const responses = await Promise.all(promises);

  if (!responses.every(i => i.status === 200)) {
    console.error("some response isn't successful", responses);
    return;
  }

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

  history.push('/main-graph');
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
