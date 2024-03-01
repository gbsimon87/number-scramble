import { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';

import './App.css'

const App = () => {
  const [range, setRange] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleRangeSelect = (selectedRange) => {
    setRange(selectedRange);
    setGameStart(true);
  };

  const resetGame = () => {
    setGameStart(false);
    setRange(null);
    setGameKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      {!gameStart ? (
        <Home onRangeSelect={handleRangeSelect} />
      ) : (
      
        <Game key={gameKey} range={range} onGameEnd={resetGame} />
      )}
    </div>
  );
};

export default App;