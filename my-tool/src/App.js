import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coding from './pages/Coding';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Progress from './pages/Progress';
import Dashboard from './pages/Dashboard';
import PythonRoutes from './routes/PythonRoutes';
import Login from './pages/Login';
import Discuss from './pages/Discuss/Discuss';
import AskQuestion from './pages/Discuss/AskQuestion';
import SingleDiscuss from './pages/Discuss/SingleDiscuss';
import FeedbackPage from './pages/FeedbackPage';
import Quiz from './pages/quiz/Quiz';
import SingleQuiz from './pages/quiz/SingleQuiz';
import AddQuiz from './pages/quiz/AddQuiz.jsx';
import  WrongAnswerPractice from './pages/WrongAnswerPractice.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/python/*" element={<PythonRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/discuss/:id" element={<SingleDiscuss />} />
        <Route path="/feedbacks" element={<FeedbackPage />} />
        <Route path="/quizzes" element={<Quiz />} />
        <Route path="/admin/quiz/:id" element={<SingleQuiz />} />
        <Route path="/admin/quiz/add" element={<AddQuiz />} />
        <Route path="/wrong-practice" element={<WrongAnswerPractice />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
