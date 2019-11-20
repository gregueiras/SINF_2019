import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import NewProcess from '../components/NewProcess/NewProcess';


function App() {
  return (
   
      <Router>
         <div className="App">
          <NavBar />
          <Menu />
          <NewProcess/>
        </div>
      </Router>
  
  );
}

export default App;
