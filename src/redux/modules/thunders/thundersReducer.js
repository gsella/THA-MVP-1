import { GET_THUNDERS, SET_THUNDERS_PENDING } from './thundersActionConstants';

const archivedThunders = [
  {
    id: 6,
    thunderKey: 6,
    name: 'Apple computer',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isActive: false,
  },
  {
    id: 7,
    thunderKey: 7,
    name: 'Nike ACG',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isActive: false,
  },
];

const defaultState = {
  activeThunders: [],
  archivedThunders: archivedThunders,
  isDataLoading: true,
  currentThunderKey: 4,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case GET_THUNDERS:
      return handleGetThunders(state, payload);
    case SET_THUNDERS_PENDING:
      return handleLoadingData(state, payload);
    default:
      return state;
  }
}

function handleLoadingData(state, isDataLoading) {
  return { ...state, isDataLoading };
}

function handleGetThunders(state, thunders) {
  return { ...state, activeThunders: thunders };
}
