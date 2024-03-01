import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Home = ({ onGameStart }) => {
  const [selectedGameMode, setSelectedGameMode] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);

  const startGame = () => {
    if (selectedGameMode && selectedRange) {
      onGameStart(selectedGameMode, selectedRange);
    } else {
      alert('Please select both a game mode and a number range to start.');
    }
  };

  return (
    <div className='home'>
      <h2 className='home__title'>Select Game Mode:</h2>
      <div className='home__mode-options'>
        <button
          className={`home__mode-option ${selectedGameMode === 'numbersToText' ? 'home__mode-option--selected' : ''}`}
          onClick={() => setSelectedGameMode('numbersToText')}>
          Numbers to Text
        </button>
        <button
          className={`home__mode-option ${selectedGameMode === 'textToNumbers' ? 'home__mode-option--selected' : ''}`}
          onClick={() => setSelectedGameMode('textToNumbers')}>
          Text to Numbers
        </button>
      </div>

      <h2 className='home__title'>Select Range of Numbers:</h2>
      <div className='home__range-options'>
        {ranges.map(range => (
          <button
            className={`home__range-option ${selectedRange === range ? 'home__range-option--selected' : ''}`}
            key={range}
            onClick={() => setSelectedRange(range)}>
            Up to {range}
          </button>
        ))}
      </div>

      <button className='home__start-button' onClick={startGame}>Start Game</button>
    </div>
  );
};

Home.propTypes = {
  onGameStart: PropTypes.func.isRequired,
};

export default Home;
