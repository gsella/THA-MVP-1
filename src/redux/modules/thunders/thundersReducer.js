const thunders = [
  {
    id: 1,
    name: 'Jira',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Jira is a proprietary issue tracking product, developed by Atlassian. It provides bug tracking, issue tracking, and project management functions.',
    isActive: true,
  },
  {
    id: 2,
    name: 'Trello',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description: 'Trello is a web-based project management application.',
    isActive: true,
  },
  {
    id: 3,
    name: 'Service Desk',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description: `A help desk is a resource intended to provide the customer or end user with information and support related to a company's or institution's products and services.`,
    isActive: true,
  },
  {
    id: 4,
    name: 'WorkDay',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Workday is an on‑demand financial management and human capital management software.',
    isActive: true,
  },
  {
    id: 5,
    name: 'Confluence',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Confluence is a team collaboration software. Written in Java and mainly used in corporate environments. Confluence is sold as either on-premises software or as software as a service.',
    isActive: true,
  },
  {
    id: 6,
    name: 'Apple computer',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isActive: false,
  },
  {
    id: 7,
    name: 'Nike ACG',
    dateCreated: new Date(),
    author: 'Noy Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isActive: false,
  },
];

const defaultState = {
  activeThunders: thunders.filter(item => item.isActive),
  archivedThunders: thunders.filter(item => !item.isActive),
  currentThunderKey: 4,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
