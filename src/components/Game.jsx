import { useState, useEffect } from 'react';
import { toWords } from 'number-to-words';
import PropTypes from 'prop-types';

const Game = ({ gameMode, range, optionCount, onGameEnd }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentNumberText, setCurrentNumberText] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [options, setOptions] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  console.log(optionCount);

  const generateOptions = (correctNumber) => {
    let optionsSet = new Set();
    optionsSet.add(correctNumber); // Add correct answer to ensure it's included

    // Generate additional unique options
    while (optionsSet.size < optionCount) {
      let potentialOption = Math.floor(Math.random() * range) + 1;
      optionsSet.add(potentialOption);
    }

    let optionsArray = Array.from(optionsSet);
    if (gameMode === 'numbersToText') {
      return optionsArray.map(number => toWords(number));
    } else {
      return optionsArray.map(number => number.toString());
    }
  };

  const generateQuestion = () => {
    const correctNumber = Math.floor(Math.random() * range) + 1;
    setCurrentNumber(correctNumber);
    setCurrentNumberText(toWords(correctNumber));

    let options = generateOptions(correctNumber);
    options.sort(() => Math.random() - 0.5); // Shuffle options
    setOptions(options);
  };

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion, gameMode, range]);

  const handleAnswer = (selectedOption) => {
    let isCorrect = false;
    if (gameMode === 'numbersToText') {
     
      isCorrect = selectedOption === toWords(currentNumber);
    } else {
     
      isCorrect = parseInt(selectedOption, 10) === currentNumber;
    }
  
    const correctAnswer = gameMode === 'numbersToText' ? toWords(currentNumber) : currentNumber.toString();
    const questionText = gameMode === 'numbersToText' ? `How do you write the number ${currentNumber}?` : `What does "${currentNumberText}" represent in numbers?`;
  
   
    const newUserResponses = [...userResponses, {
      questionNumber: currentQuestion,
      question: questionText,
      userAnswer: selectedOption,
      correctAnswer: correctAnswer,
    }];
  
    setUserResponses(newUserResponses);
  
    if (isCorrect) {
      setScore(score + 1);
    }
  
   
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameEnded(true);
    }
  };

  if (gameEnded) {
    const percentageScore = (score / 5) * 100;
    const incorrectResponses = userResponses.filter(response => response.userAnswer !== response.correctAnswer);
  
    return (
      <div className='game'>
        <h2 className='game__score'>Your score is {score} out of 5, which is {percentageScore}%</h2>
        {incorrectResponses.length > 0 && (
          <div className='game__feedback'>
            <h3 className='game__feedback-title'>Incorrect Answers:</h3>
            <ul className='game__feedback-list'>
              {incorrectResponses.map((response, index) => (
                <li className='game__feedback-item' key={index}>
                  Question {response.questionNumber}: {response.question} You answered &quot;{response.userAnswer}&quot;, but the correct answer was &quot;{response.correctAnswer}&quot;.
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className='game__restart-button' onClick={() => onGameEnd()}>Start New Game</button>
      </div>
    );
  }

  return (
    <div className='game'>
      <h2 className='game__question'>
        {gameMode === 'numbersToText'
          ? `How do you write the number ${currentNumber}?`
          : `What does "${currentNumberText}" represent in numbers?`}
      </h2>
      <div className='game__options'>
        {options.map((option, index) => (
          <button className='game__option-button' key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

Game.propTypes = {
  gameMode: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired,
  optionCount: PropTypes.number,
  onGameEnd: PropTypes.func.isRequired,
};

export default Game;
