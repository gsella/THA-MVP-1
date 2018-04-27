import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import InsightsToolsContainer from 'components/pages/insights-tools/InsightsToolsContainer';
import history from './history';
import MainGraphContainer from 'components/pages/main-graph/MainGraphContainer';

const AppComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/main-graph" component={MainGraphContainer} />
        <Route exact path="/create-insights" component={InsightsToolsContainer} />

        <Redirect from="/" exact to="/main-graph" />
        <Redirect from="*" exact to="/error/not-found" />
      </Switch>
    </Router>
  );
};

export default AppComponent;
