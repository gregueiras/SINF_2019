import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Menu from './components/Menu/Menu';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   
      <Router>
         <div className="App">
          <NavBar />
          <Menu />
        </div>
      </Router>
  
  );
}

export default App;
