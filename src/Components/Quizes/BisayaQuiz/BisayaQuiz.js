import React, { useState } from 'react';
import bisayaQuizData from './bisayaQuizData.json';
import Quiz from '../Quiz';
const BisayaQuiz = () => {
  return (
    <div>
      <Quiz quizData={bisayaQuizData} />
    </div>
  );
};

export default BisayaQuiz;