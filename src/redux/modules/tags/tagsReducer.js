const defaultState = {
  tags: {
    1: {
      name: 'PM',
    },
    2: {
      name: 'Challenges',
    },
    3: {
      name: 'Other Players',
    },
    4: {
      name: 'Marketing',
    },
    5: {
      name: 'Other Tag',
    },
    6: {
      name: 'Other',
    },
  },
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
