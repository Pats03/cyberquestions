import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Button = ({ to, className, children }) => (
  <Link
    to={to}
    className={`p-3 rounded-md text-black bg-green-500 hover:bg-green-700 transition duration-300 text-center block ${className}`}
  >
    {children}
  </Link>
);



const AllContent = () => {
const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/v1/auth/logout', {
        withCredentials: true, // Ensure cookies (token) are cleared
      });

      // Redirect to login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/quiz/quiz');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <nav className="flex items-center justify-center gap-4 p-4 bg-gray-800 shadow-lg">
        <Button
          to="/admin"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Create Quiz
        </Button>
        <Button
          to="/all-content"
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          All Content
        </Button>
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition text-sm font-bold"
        >
          Logout
        </button>
      </nav>

      <div className="mt-6">
        <h1 className="text-center text-3xl font-bold text-green-400">
          All Quiz Content
        </h1>

        {loading ? (
          <p className="text-center text-yellow-400 mt-4">Loading quizzes...</p>
        ) : error ? (
          <p className="text-center text-red-400 mt-4">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                questionData={question}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContent;
