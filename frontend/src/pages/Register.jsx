import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Register from '../components/Register/Register';

function App() {
  return (
    <div className="App">
        <NavBar disableLogout='true'/>
      <Register />
    </div>
  );
}

export default App;