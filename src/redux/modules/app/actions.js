import ACTION_CONSTANTS from './constants';
import * as insightsApi from '../../../api/insightsApi';
import { GET_NEW_INSIGHTS } from '../insights/insightsActionConstants';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';

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

export const refreshThunder = (thunderkey = 4) => async (
  dispatch,
  getState
) => {
  const isRefresh = { ...getState().app }.isRefresh;

  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: ACTION_CONSTANTS.REFRESH_THUNDER,
      payload: response.data.map(mapInsightFromApi),
    });
  }

  dispatch({
    type: ACTION_CONSTANTS.PRELOADER,
    payload: true,
  });

  dispatch({
    type: GET_NEW_INSIGHTS,
    payload: [
      {
        InsightKey: 30,
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
        InsightOrder: 1,
        isActive: true,
      },
    ]
      .map(mapInsightFromApi)
      .map(a => ({ ...a, isNew: true })),
  });

  setTimeout(
    () =>
      dispatch({
        type: ACTION_CONSTANTS.PRELOADER,
        payload: false,
      }),
    1000
  );
};
