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
import Login from './pages/Login';
import Register from './pages/Register';

import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <React.Suspense fallback="loading">
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route path="/logs" exact>
            <Logs />
          </Route>
          <Route path="/view-process/:id" exact>
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
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.Suspense>
);

export default App;
