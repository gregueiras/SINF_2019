import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import Settings from '../components/Settings/Settings';


function App() {
  return (

    <div className="App">
      <NavBar />
      <Menu active="settings" />
      <Settings />
    </div>

  );
}

export default App;
