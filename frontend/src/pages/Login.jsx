import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Login from '../components/Login/Login';

function App() {
  return (
    <div className="App">
        <NavBar disableLogout='true'/>
      <Login />
    </div>
  );
}

export default App;