import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import Overview from '../components/Overview/Overview';


function App() {
  return (

    <div className="App">
      <NavBar />
      <Menu active="overview" />
      <Overview />
    </div>

  );
}

export default App;
