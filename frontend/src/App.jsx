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

          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
