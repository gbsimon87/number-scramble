import { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';

const App = () => {
  const [gameMode, setGameMode] = useState('');
  const [range, setRange] = useState(null);
  const [gameStart, setGameStart] = useState(false);

  const handleGameStart = (selectedGameMode, selectedRange) => {
    setGameMode(selectedGameMode);
    setRange(selectedRange);
    setGameStart(true);
  };

  const resetGame = () => {
    setGameStart(false);
    setGameMode('');
    setRange(null);
  };

  return (
    <div className='App'>
      {!gameStart ? (
        <Home onGameStart={handleGameStart} />
      ) : (
        <Game gameMode={gameMode} range={range} onGameEnd={resetGame} />
      )}
    </div>
  );
};

export default App;
