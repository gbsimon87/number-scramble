import { useState, useEffect } from 'react';
import { toWords } from 'number-to-words';
import PropTypes from 'prop-types';

const Game = ({ gameMode, range, onGameEnd }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentNumberText, setCurrentNumberText] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [options, setOptions] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  const generateQuestion = () => {
    const number = Math.floor(Math.random() * range) + 1;
    let incorrectNumber;
    do {
      incorrectNumber = Math.floor(Math.random() * range) + 1;
    } while (incorrectNumber === number);

    setCurrentNumber(number);
    setCurrentNumberText(toWords(number));

    let correctOption, incorrectOption;
    if (gameMode === 'numbersToText') {
      correctOption = toWords(number);
      incorrectOption = toWords(incorrectNumber);
    } else {
      correctOption = number.toString();
      incorrectOption = incorrectNumber.toString();
    }

    const options = [correctOption, incorrectOption].sort(() => Math.random() - 0.5);
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
    const questionText = gameMode === 'numbersToText' ? `What is the number ${currentNumber} in text?` : `What does "${currentNumberText}" represent in numbers?`;
  
   
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
                  Question {response.questionNumber}: {response.question} You answered "{response.userAnswer}", but the correct answer was "{response.correctAnswer}".
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
          ? `What is the number ${currentNumber} in text?`
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
  onGameEnd: PropTypes.func.isRequired,
};

export default Game;
