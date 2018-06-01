import { INSIGHTS_PAGE_SET_LAUNCHING_STATE } from './InsightsPageActionConstants';

export const setLaunching = value => dispatch => {
  dispatch({ type: INSIGHTS_PAGE_SET_LAUNCHING_STATE, payload: value });
};
