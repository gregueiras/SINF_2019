import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import Overview from '../components/Overview/Overview';


function App() {
  return (
   
      <Router>
         <div className="App">
          <NavBar />
          <Menu />
          <Overview/>
        </div>
      </Router>
  
  );
}

export default App;