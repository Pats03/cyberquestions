import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RulesPage = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  // Handle logout function
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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Glowing Theme */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-green-400 to-transparent w-1 h-full absolute left-4"></div>
        <div className="bg-gradient-to-r from-green-400 to-transparent w-1 h-full absolute right-4"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 opacity-20 w-[400px] h-[400px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 opacity-10 w-[600px] h-[600px]"></div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition text-sm font-bold"
      >
        Logout
      </button>

      {/* Content */}
      <div className="z-10 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">The Game of Cybersecurity</h1>

        {/* Welcome Message */}
        <p className="text-xl font-semibold mb-8">
          Welcome Anantha to the quiz!
        </p>

        {/* Start Button */}
        <button
          onClick={() => navigate(`/selection/${role}`)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition text-lg font-bold"
        >
          Start
        </button>

        {/* Rules Box */}
        <div className="bg-gray-800 text-white mt-8 p-6 rounded-lg w-[350px] sm:w-[600px] mx-auto relative border border-green-500">
          <h2 className="text-2xl font-bold mb-4 text-center">How to play?</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            You have the option to play with or without a timer. If you choose
            the timer mode, you must answer a series of cybersecurity-related
            questions within the given time limit, earning extra time for each
            correct answer.
            <br />
            <br />
            The game consists of three levels: Level 1, Level 2, and Level 3,
            each increasing in difficulty. To answer the questions, select the
            correct option, and the game will automatically progress.
            <br />
            <br />
            At the end, your score is computed based on your performance.
            <br />
            <br />
            Have fun!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
