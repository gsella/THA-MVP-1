import tags from '../../../staticData/tags';

const defaultState = {
  tags
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
