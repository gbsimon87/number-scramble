import { useState } from 'react';
import PropTypes from 'prop-types';

const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const optionCounts = [1, 2, 3, 4, 5];

const Home = ({ onGameStart }) => {
  const [selectedGameMode, setSelectedGameMode] = useState('');
  const [selectedRange, setSelectedRange] = useState('');
  const [selectedOptionCount, setSelectedOptionCount] = useState(2);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);

  const startGame = () => {
    if (selectedGameMode && selectedRange && selectedOptionCount && selectedQuestionCount) {
      onGameStart(selectedGameMode, parseInt(selectedRange, 10), selectedOptionCount, selectedQuestionCount); // Ensure selectedQuestionCount is passed
    } else {
      alert('Please select a game mode, a number range, the number of options, and the number of questions to start.');
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
        {/* Dropdown for range selection */}
        <select 
          className='home__range-select' 
          value={selectedRange} 
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="">Select a range</option> {/* Default option */}
          {ranges.map(range => (
            <option key={range} value={range}>
              Up to {range}
            </option>
          ))}
        </select>
      </div>

      <h2 className='home__title'>Select Number of Options:</h2>
      <div className='home__option-count'>
        <select 
          className='home__option-count-select' 
          value={selectedOptionCount} 
          onChange={(e) => setSelectedOptionCount(parseInt(e.target.value, 10))}
        >
          {optionCounts.map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <h2 className='home__title'>Select Number of Questions:</h2>
      <div className='home__question-count'>
        <select 
          className='home__question-count-select' 
          value={selectedQuestionCount} 
          onChange={(e) => setSelectedQuestionCount(parseInt(e.target.value, 10))}
        >
          {/* Providing options for question count */}
          {[5, 10, 15, 20].map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <button className='home__start-button' onClick={startGame}>Start Game</button>
    </div>
  );
};

Home.propTypes = {
  onGameStart: PropTypes.func.isRequired,
};

export default Home;
