import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import NewProcess from '../components/NewProcess/NewProcess';


function App() {
  return (

    <div className="App">
      <NavBar />
      <Menu active="overview" />
      <NewProcess />
    </div>

  );
}

export default App;
