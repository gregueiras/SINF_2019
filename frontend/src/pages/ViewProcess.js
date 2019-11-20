import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import ViewProcess from '../components/ViewProcess/ViewProcess';


function App() {
  return (
   
      <Router>
         <div className="App">
          <NavBar />
          <Menu />
          <ViewProcess/>
        </div>
      </Router>
  
  );
}

export default App;
