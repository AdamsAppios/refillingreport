import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BisayaQuiz from './Quizes/BisayaQuiz/BisayaQuiz';
function Homepage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Please use another url</div>} />
        <Route path="/bisayaquiz" element={<BisayaQuiz />} />
      </Routes>
    </Router>
  );
}

export default Homepage;