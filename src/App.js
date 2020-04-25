import React from 'react';
import './App.css';
import Board from './tic-tac-toe/Game';
import Recipe from './recipe-app/Recipe';
import Covid from './covid-tracking/Covid';

function App() {
  return (
    <div className="App">
      {/* <Board /> */}
      {/* <Recipe /> */}
      <Covid />
    </div>
  );
}

export default App;
