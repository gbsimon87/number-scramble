import { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import './App.css';

const App = () => {
  const [gameMode, setGameMode] = useState('');
  const [range, setRange] = useState(null);
  const [optionCount, setOptionCount] = useState(2);
  const [gameStart, setGameStart] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);

  const handleGameStart = (selectedGameMode, selectedRange, selectedOptionCount, selectedQuestionCount) => {
    setGameMode(selectedGameMode);
    setRange(selectedRange);
    setOptionCount(selectedOptionCount);
    setQuestionCount(selectedQuestionCount);
    setGameStart(true);
  };
  

  const resetGame = () => {
    setGameStart(false);
    setGameMode('');
    setRange(null);
    setOptionCount(2);
    setQuestionCount(0);
  };

  return (
    <div className='App'>
      {!gameStart ? (
        <Home onGameStart={handleGameStart} />
      ) : (
        <Game
          gameMode={gameMode}
          range={range}
          optionCount={optionCount}
          questionCount={questionCount} // Make sure this prop is passed
          onGameEnd={resetGame}
        />
      )}
    </div>
  );
};

export default App;
