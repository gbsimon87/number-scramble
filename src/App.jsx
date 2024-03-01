import { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import './App.css';

const App = () => {
  const [gameMode, setGameMode] = useState('');
  const [range, setRange] = useState(null);
  const [optionCount, setOptionCount] = useState(2); // Default to 2 options
  const [gameStart, setGameStart] = useState(false);

  const handleGameStart = (selectedGameMode, selectedRange, selectedOptionCount) => {
    setGameMode(selectedGameMode);
    setRange(selectedRange);
    setOptionCount(selectedOptionCount); // Save the selected option count
    setGameStart(true);
  };

  const resetGame = () => {
    setGameStart(false);
    setGameMode('');
    setRange(null);
    setOptionCount(2); // Reset to default
  };

  return (
    <div className='App'>
      {!gameStart ? (
        <Home onGameStart={handleGameStart} />
      ) : (
        <Game gameMode={gameMode} range={range} optionCount={optionCount} onGameEnd={resetGame} />
      )}
    </div>
  );
};

export default App;
