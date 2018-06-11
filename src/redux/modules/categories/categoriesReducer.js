import { GET_CATEGORIES } from './categoriesActionConstants';

const defaultState = {
  categories: {},
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
}
