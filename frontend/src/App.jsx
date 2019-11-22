/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Overview from './pages/Overview'
import Logs from './pages/Logs'
import ViewProcess from './pages/ViewProcess'
import NewProcess from './pages/NewProcess'

import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <React.Suspense fallback="loading">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/overview" exact component={Overview} />
            <Route path="/logs" exact component={Logs} />
            <Route path="/view-process" exact component={ViewProcess} />
            <Route path="/new-process" exact component={NewProcess} />

          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
