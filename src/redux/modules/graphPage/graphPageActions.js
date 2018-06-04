import { format } from 'date-fns';
import ACTION_CONSTANTS from './graphPageConstants';
import * as insightsApi from '../../../api/insightsApi';
import {
  GET_INSIGHTS,
  GET_NEW_INSIGHTS,
} from '../insights/insightsActionConstants';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import { sortInsightsByCategoryAndOrder } from '../../../helper/apiDataSorter';

export const hideInsight = (categoryKey, categoryId) => (
  dispatch,
  getState
) => {
  const hiddenInsights = { ...getState().graphPage.hiddenInsights };
  const insights = [...getState().insights.insights];

  const filterInsightsByCategory = insights.filter(
    insight => insight.categoryId === categoryId
  );

  if (hiddenInsights[categoryId] && hiddenInsights[categoryId].categoryKeys) {
    const index = hiddenInsights[categoryId].categoryKeys.findIndex(
      insight => insight === categoryKey
    );

    if (index === -1) {
      hiddenInsights[categoryId].categoryKeys.push(categoryKey);
    } else {
      hiddenInsights[categoryId].categoryKeys.splice(index, 1);
    }
  } else {
    hiddenInsights[categoryId] = {
      isAllInsightsInCategory: false,
      categoryKeys: [categoryKey],
    };
  }

  hiddenInsights[categoryId].isAllInsightsInCategory =
    hiddenInsights[categoryId].categoryKeys.length ===
    filterInsightsByCategory.length;

  dispatch({
    type: ACTION_CONSTANTS.TOGGLE_VISIBLE_INSIGHT,
    payload: hiddenInsights,
  });
};

export const hideCategory = (categoryId, abbreviation) => (
  dispatch,
  getState
) => {
  const hiddenInsights = { ...getState().graphPage.hiddenInsights };
  const insights = [...getState().insights.insights];

  if (
    hiddenInsights[categoryId] &&
    hiddenInsights[categoryId].categoryKeys &&
    hiddenInsights[categoryId].isAllInsightsInCategory
  ) {
    hiddenInsights[categoryId].categoryKeys = [];
    hiddenInsights[categoryId].isAllInsightsInCategory = false;
  } else {
    hiddenInsights[categoryId] = {
      isAllInsightsInCategory: true,
      categoryKeys: [],
    };

    insights
      .filter(insight => insight.categoryId === categoryId)
      .forEach(insight => {
        hiddenInsights[categoryId].categoryKeys.push(
          `${abbreviation}${insight.order}`
        );
      });
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
    format(
      new Date(selectedDate.getTime()).setDate(selectedDate.getDate() + 1),
      'YYYY-MM-DD'
    ),
    format(new Date().setDate(new Date().getDate() + 1), 'YYYY-MM-DD')
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
