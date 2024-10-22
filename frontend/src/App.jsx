/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Overview from './pages/Overview';
import Logs from './pages/Logs';
import ViewProcess from './pages/ViewProcess';
import NewProcess from './pages/NewProcess';
import CreateProcessType from './pages/CreateProcessType';
import MasterData from './pages/MasterData';
import Settings from './pages/Settings';

import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <React.Suspense fallback="loading">
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" exact>
            <Overview />
          </Route>
          <Route path="/logs" exact>
            <Logs />
          </Route>
          <Route path="/view-process" exact>
            <ViewProcess />
          </Route>
          <Route path="/new-process" exact>
            <NewProcess />
          </Route>
          <Route path="/create-process-type" exact>
            <CreateProcessType />
          </Route>
          <Route path="/master-data" exact>
            <MasterData />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.Suspense>
);

export default App;
