import './App.css';
import CyberGameEntry from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import QuizSelection from './components/Selection';
import Quiz from './components/Quiz';
import Rule from './components/Rule';
import Login from './components/Login';
import Admin from './components/Adminpage';
import AllContent from './components/Allcontent';
import LeaderBoard from './components/LeaderBoard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CyberGameEntry />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selection/:role" element={<QuizSelection />} />
          <Route path="/quiz/:role" element={<Quiz />} />
          <Route path="/rules/:role" element={<Rule />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/all-content" element={<AllContent />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
