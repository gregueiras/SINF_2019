import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import CreateProcessType from '../components/CreateProcessType/CreateProcessType';


function App() {
  return (

    <div className="App">
      <NavBar />
      <Menu active="overview" />
      <CreateProcessType />
    </div>

  );
}

export default App;
