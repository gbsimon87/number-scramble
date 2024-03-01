import PropTypes from 'prop-types';
import { useState } from 'react';

const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Home = ({ onGameStart }) => {
  const [gameMode, setGameMode] = useState('');
  const [step, setStep] = useState(1); // 1 for game mode selection, 2 for range selection

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    setStep(2); // Move to range selection
  };

  const handleRangeSelect = (range) => {
    onGameStart(gameMode, range);
  };

  return (
    <div className='home'>
      {step === 1 && (
        <>
          <h2 className='home__title'>Select a game mode:</h2>
          <button className='home__button' onClick={() => handleGameModeSelect('numbersToText')}>Numbers to Text</button>
          <button className='home__button' onClick={() => handleGameModeSelect('textToNumbers')}>Text to Numbers</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Select the range of numbers:</h2>
          {ranges.map(range => (
            <button key={range} className='home__button' onClick={() => handleRangeSelect(range)}>
              Up to {range}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  onGameStart: PropTypes.func.isRequired,
};

export default Home;
