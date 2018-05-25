import * as React from 'react';
import history from './history';
import { Router, Switch, Redirect } from 'react-router-dom';
import InsightsToolsContainer from 'components/pages/insights-tools/InsightsToolsContainer';
import MainGraphContainer from 'components/pages/main-graph/MainGraphContainer';
import HeaderWrapperRoute from './custom-routers/HeaderWrapperRoute';

const AppComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <HeaderWrapperRoute
          exact
          path="/main-graph"
          component={MainGraphContainer}
        />
        <HeaderWrapperRoute
          exact
          path="/create-insights"
          component={InsightsToolsContainer}
        />

        <Redirect from="/" exact to="/main-graph" />
        <Redirect from="*" exact to="/error/not-found" />
      </Switch>
    </Router>
  );
};

export default AppComponent;
