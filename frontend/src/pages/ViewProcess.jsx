import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu/Menu';
import ViewProcess from '../components/ViewProcess/ViewProcess';


function App() {
  return (

    <div className="App">
      <NavBar />
      <Menu active="overview" />
      <ViewProcess />
    </div>

  );
}

export default App;
