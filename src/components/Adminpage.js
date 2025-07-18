import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Button = ({ to, className, children, onClick, type }) => (
  <Link
    to={to}
    onClick={onClick}
    type={type}
    className={`p-3 rounded-md text-black bg-green-500 hover:bg-green-700 transition duration-300 text-center block ${className}`}
  >
    {children}
  </Link>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    description: '',
    difficulty: 'easy',
    role: '',
    category: '',
    link: '',
  });

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...quiz.options];
    newOptions[index] = value;
    setQuiz({ ...quiz, options: newOptions });
  };
  const handleLogout = async () => {
    try {
      await axios.get(
        'https://cybersecuirty-backend.vercel.app/api/v1/auth/logout',
        {
          withCredentials: true, // Ensure cookies (token) are cleared
        }
      );

      // Redirect to login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://cybersecuirty-backend.vercel.app/api/v1/quiz/quiz',
        quiz
      );

      console.log('Quiz successfully submitted:', response.data);
      alert('Quiz created successfully!');

      // Optional: Reset form after submission
      setQuiz({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        description: '',
        difficulty: 'easy',
        role: '',
        category: '',
        link: '',
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to create quiz.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-green-400 flex flex-col items-center justify-center p-6">
      <nav className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl mb-6">
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

      <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-green-500">
        <h2 className="text-2xl font-bold text-center mb-4">Create a Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="question"
            value={quiz.question}
            onChange={handleChange}
            placeholder="Enter your question"
            required
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          />
          <div>
            <label className="font-semibold">Options:</label>
            {quiz.options.map((option, index) => (
              <input
                key={index}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
                className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400 mt-2"
              />
            ))}
          </div>
          <input
            name="answer"
            value={quiz.answer}
            onChange={handleChange}
            placeholder="Correct answer"
            required
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          />
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            placeholder="Explanation for the answer"
            required
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          />
          <select
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="role"
            value={quiz.role}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          >
            <option value="">Select Role</option>
            <option value="Admin">HR</option>
            <option value="Student">Junior Data Analyst</option>
            <option value="Teacher">Senior Data Analyst</option>
          </select>
          <input
            name="category"
            value={quiz.category}
            onChange={handleChange}
            placeholder="Category (e.g., Cybersecurity, Networking)"
            required
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          />
          <input
            name="link"
            value={quiz.link}
            onChange={handleChange}
            placeholder="Reference link"
            required
            className="w-full p-3 bg-gray-800 border border-green-500 rounded text-green-400"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-green-500 hover:bg-green-700 transition duration-300 text-black font-bold"
          >
            Submit Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
