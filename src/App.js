import React from 'react';
import './App.css';
import Background from "./components/Background/Background";
import Login from "./containers/Login/Login";

function App() {
  return (
    <div className="App">
      <Background/>
      <Login/>
    </div>
  );
}

export default App;
