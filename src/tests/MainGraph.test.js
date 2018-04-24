import React from 'react';
import ReactDOM from 'react-dom';
import MainGraph from 'components/pages/main-graph/MainGraph';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainGraph />, div);
  ReactDOM.unmountComponentAtNode(div);
});
