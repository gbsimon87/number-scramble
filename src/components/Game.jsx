import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Game = ({ range, onGameEnd }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [options, setOptions] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  const numberToWord = (number) => {
    const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    return words[number - 1] || number.toString();
  };

  const generateQuestion = () => {
    const correctNumber = Math.floor(Math.random() * range) + 1;
    let incorrectNumber = Math.floor(Math.random() * range) + 1;
    while (incorrectNumber === correctNumber) {
      incorrectNumber = Math.floor(Math.random() * range) + 1;
    }
  
    setCurrentNumber(correctNumber);
  
    const shuffledOptions = [correctNumber, incorrectNumber]
      .map(number => numberToWord(number))
      .sort(() => Math.random() - 0.5);
  
    setOptions(shuffledOptions);
  };

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === numberToWord(currentNumber);
    const newUserResponses = [...userResponses, {
      questionNumber: currentQuestion,
      userAnswer: selectedOption,
      correctAnswer: numberToWord(currentNumber),
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
      <div>
        <h2>Your score is {score} out of 5, which is {percentageScore}%</h2>
        {incorrectResponses.length > 0 && (
          <div>
            <h3>Incorrect Answers:</h3>
            <ul>
              {incorrectResponses.map((response, index) => (
                <li key={index}>
                  Question {response.questionNumber}: You answered &quot;{response.userAnswer}&quot;, but the correct answer was &quot;{response.correctAnswer}&quot;.
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={() => onGameEnd()}>Start New Game</button>
      </div>
    );
  }
  

  return (
    <div>
      <h2>What is the number {currentNumber} in text?</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

Game.propTypes = {
  range: PropTypes.number.isRequired,
  onGameEnd: PropTypes.func.isRequired,
};

export default Game;
