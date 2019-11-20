import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import Logs from '../components/Logs/Logs';


function App() {
  return (
   
      <Router>
         <div className="App">
          <NavBar />
          <Menu />
          <Logs/>
        </div>
      </Router>
  
  );
}

export default App;
