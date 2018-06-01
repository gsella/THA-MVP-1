import { INSIGHTS_PAGE_SET_LAUNCHING_STATE } from './InsightsPageActionConstants';

const defaultState = {
  isLaunching: false,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case INSIGHTS_PAGE_SET_LAUNCHING_STATE:
      return { ...state, isLaunching: payload };
    default:
      return state;
  }
}
