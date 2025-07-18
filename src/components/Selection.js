import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const QuizSelection = () => {
  const navigate = useNavigate();
  const { role } = useParams();
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
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition text-sm font-bold"
      >
        Logout
      </button>
      {/* Animated glowing circles */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-green-400 opacity-20 blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-400 opacity-20 blur-[120px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      ></motion.div>

      {/* Main container */}
      <motion.div
        className="relative bg-gray-800 border border-green-500 rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Title */}
        <h1 className="text-2xl font-extrabold text-center text-green-400 mb-4">
          Cybersecurity Quiz
        </h1>

        {/* Welcome Message */}
        <p className="text-lg text-white font-semibold mb-6">
          Welcome, <span className="text-green-400">Anantha!</span> <br />
          Choose the way of quiz:
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <motion.button
            className="px-6 py-2 bg-green-500 text-gray-900 rounded-full font-bold hover:bg-green-600 transition"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate(`/quiz/${role}`)}
          >
            Quiz with Timer
          </motion.button>

          <motion.button
            className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate(`/quiz/${role}`)}
          >
            Quiz without Timer
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Lines and Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-32 bg-green-500 blur-[2px]"></div>
        <div className="absolute bottom-20 right-10 w-1 h-32 bg-green-500 blur-[2px]"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default QuizSelection;
