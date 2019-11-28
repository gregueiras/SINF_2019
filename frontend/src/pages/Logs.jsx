import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import Logs from '../components/Logs/Logs';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Menu active="logs" />
      <Logs />
    </div>
  );
}

export default App;
