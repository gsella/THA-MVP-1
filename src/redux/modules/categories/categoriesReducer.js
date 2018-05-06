const defaultState = {
  categories: {
    1: {
      name: 'KYC',
      color: '#22bae6',
    },
    2: {
      name: 'Features',
      color: '#d92be5',
    },
    3: {
      name: 'Competition',
      color: '#0fb54a',
    },
  },
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
