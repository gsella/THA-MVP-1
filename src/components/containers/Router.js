import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import InsightsToolsContainer from 'components/pages/insights-tools/InsightsToolsContainer';
import history from './history';
import MainGraph from 'components/pages/main-graph/MainGraph';

const AppComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/main-graph" component={MainGraph} />
        <Route exact path="/create-insights" component={InsightsToolsContainer} />

        <Redirect from="/" exact to="/create-insights" />
        <Redirect from="*" exact to="/error/not-found" />
      </Switch>
    </Router>
  );
};

export default AppComponent;
