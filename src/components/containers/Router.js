import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from './history';
import MainGraph from 'components/pages/main-graph/MainGraph';
import DataTablePage from 'components/pages/data-table-page/DataTablePage.js';

const AppComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/main-graph" component={MainGraph} />
        <Route exact path="/data-table" component={DataTablePage} />

        <Redirect from="/" exact to="/main-graph" />
        <Redirect from="*" exact to="/error/not-found"/>
      </Switch>
    </Router>
  );
};

export default AppComponent;
