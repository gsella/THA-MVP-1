import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from './history';
import MainGraph from 'components/pages/main-graph/MainGraph';

const AppComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/main-graph" component={MainGraph} />

        <Redirect from="/" exact to="/main-graph" />
        <Redirect from="*" exact to="/error/not-found"/>
      </Switch>
    </Router>
  );
};

export default AppComponent;
