import React, { useState, useEffect } from 'react';

const shuffleQuestions = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};

const Quiz = ({quizData}) => {
    const [questions, setQuestions] = useState(shuffleQuestions([...quizData]));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });
    const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions(shuffleQuestions([...quizData]));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = userInput.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
    setShowAnswer(true);
    setScore(prevScore => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      wrong: prevScore.wrong + (isCorrect ? 0 : 1)
    }));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [userInput, currentQuestion]);

  const moveToNextQuestion = () => {
    setShowAnswer(false);
    setUserInput('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(shuffleQuestions([...quizData]));
    setCurrentQuestionIndex(0);
    setScore({ correct: 0, wrong: 0 });
    setQuizFinished(false);
  };

  return (
    <div>
      <p>Score: Correct - {score.correct}, Wrong - {score.wrong}</p>
      {!quizFinished ? (
        <>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <p>{currentQuestion.questionText}</p>
          <input type="text" value={userInput} onChange={handleInput} />
          <button onClick={handleSubmit}>Submit</button>
          {showAnswer && (
            <div>
              <p style={{ color: isAnswerCorrect ? 'green' : 'red' }}>
                {isAnswerCorrect ? '✅ Correct Answer!' : '❌ Incorrect!'}
                <br />
                Correct Answer: {currentQuestion.correctAnswer}
              </p>
              <button onClick={moveToNextQuestion}>Next Question</button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Quiz finished! Your score: {score.correct} correct, {score.wrong} wrong.</p>
          <button onClick={restartQuiz}>Try Again?</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;