const defaultState = {
  categories: {
    1: {
      id: 1,
      name: 'KYC',
      color: '#22bae6',
      abbreviation: 'K',
    },
    2: {
      id: 2,
      name: 'Features',
      color: '#d92be5',
      abbreviation: 'F',
    },
    3: {
      id: 3,
      name: 'Competition',
      color: '#0fb54a',
      abbreviation: 'C',
    },
    4: {
      id: 4,
      name: 'Custom',
      color: '#4a90e2',
      abbreviation: 'U',
    },
    5: {
      id: 5,
      name: 'Actions',
      color: '#e2d84a',
      abbreviation: 'A',
    },
    6: {
      id: 6,
      name: 'Moves',
      color: '#c03600',
      abbreviation: 'M',
    },
  },
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
