import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import MasterData from '../components/MasterData/MasterData';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Menu active="master-data" />
      <MasterData />
    </div>
  );
}

export default App;
