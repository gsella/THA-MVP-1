import * as insightsApi from '../../../api/insightsApi';
import { mapInsightFromApi } from '../../../helper/apiDataMapper';
import { GET_INSIGHTS } from './insightsActionConstants';
import ACTION_CONSTANTS from '../app/constants';

export const getInsights2 = (thunderkey = 4) => async dispatch => {
  const response = await insightsApi.getInsights(thunderkey);

  if (response.status === 200) {
    dispatch({
      type: GET_INSIGHTS,
      payload: response.data.map(mapInsightFromApi),
    });
  }
};

export const getInsights = () => dispatch => {
  dispatch(getInsights2());

  const data = {
    bubbles: chartData.bubbles.map(bubble => {
      bubble.isVisible = true;
      return bubble;
    }),
  };

  setTimeout(
    () =>
      dispatch({
        type: ACTION_CONSTANTS.GET_CHART_DATA,
        payload: data,
      }),
    3000
  );
};

const chartData = {
  bubbles: [
    {
      id: 1,
      categoryId: 1,
      tagId: 6,
      categoryKey: 'K1',
      insight: 'Home Use',
      popularity: 1,
      instances: 5,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      categoryId: 1,
      tagId: 4,
      categoryKey: 'K2',
      insight: 'Music Use',
      popularity: 0,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 3,
      categoryId: 1,
      tagId: 3,
      categoryKey: 'K3',
      insight: 'Office Use',
      popularity: -1,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 4,
      categoryId: 1,
      tagId: 1,
      categoryKey: 'K4',
      insight: 'Kids Use',
      popularity: 1,
      instances: 3,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 5,
      categoryId: 2,
      tagId: 3,
      categoryKey: 'F1',
      insight: 'Speakers',
      popularity: 0,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 6,
      categoryId: 2,
      tagId: 2,
      categoryKey: 'F2',
      insight: 'Phone',
      popularity: -1,
      instances: 2,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 7,
      categoryId: 2,
      tagId: 3,
      categoryKey: 'F3',
      insight: 'Calendar',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 8,
      categoryId: 3,
      tagId: 5,
      categoryKey: 'C1',
      insight: 'Siri',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: 9,
      categoryId: 3,
      tagId: 5,
      categoryKey: 'C2',
      insight: 'Google Home',
      popularity: 0,
      instances: 4,
      description: 'Lorem ipsum dolor sit amet.',
    },
  ],
};
