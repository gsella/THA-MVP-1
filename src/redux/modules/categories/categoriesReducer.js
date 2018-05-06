const defaultState = {
  categories: {
    1: {
      id: 1,
      name: 'KYC',
      color: '#22bae6',
    },
    2: {
      id: 2,
      name: 'Features',
      color: '#d92be5',
    },
    3: {
      id: 3,
      name: 'Competition',
      color: '#0fb54a',
    },
    4: {
      id: 4,
      name: 'Custom',
      color: '#4a90e2',
    },
    5: {
      id: 5,
      name: 'Actions',
      color: '#e2d84a',
    },
    6: {
      id: 6,
      name: 'Moves',
      color: '#c03600',
    },
  },
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
