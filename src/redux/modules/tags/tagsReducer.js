import { GET_TAGS } from './tagsActionConstants';

const defaultState = {
  tags: {},
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_TAGS:
      return { ...state, tags: payload };

    default:
      return state;
  }
}
