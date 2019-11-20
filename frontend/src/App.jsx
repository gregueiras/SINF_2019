/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Overview from './pages/Overview'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
function App() {
  return (
    <React.Suspense fallback="loading">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Overview} />

          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
