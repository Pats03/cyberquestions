import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CyberGameEntry = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  var role = '';
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(''); // Clear previous errors

    // Basic validation
    if (!username || !password) {
      setError('Email and Password are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/login',
        { email: username, password: password },
        { withCredentials: true }
      );

      if (response.data?.msg) {
        if (response.data?.role) {
          const role = response.data.role;
          navigate(`/rules/${role}`);
        } else if (response.data?.role1) {
          navigate('/admin');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        setError(
          error.response.data.message ||
            'Login failed. Please check your credentials.'
        );
      } else if (error.request) {
        // No response received (network issue)
        setError('Network error. Please try again later.');
      } else {
        // Unexpected error
        setError('Something went wrong. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated glowing circles */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-green-400 opacity-20 blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-400 opacity-20 blur-[120px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main form container */}
      <motion.div
        className="relative bg-gray-800 border border-green-500 rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h1 className="text-2xl font-extrabold text-green-400 mb-4">
          Cybersecurity Quiz
        </h1>
        <h3 className="text-2xl font-extrabold text-green-400 mb-4">LOGIN</h3>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-red-900 bg-red-300 p-2 rounded mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Input Fields */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Organization Email"
          className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400 mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400"
        />

        {/* Submit Button */}
        <motion.button
          className="mt-6 bg-green-500 text-gray-900 rounded-full w-full py-2 font-bold hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleSubmit}
        >
          SUBMIT
        </motion.button>

        <motion.button
          className="mt-6 bg-green-500 text-gray-900 rounded-full w-full py-2 font-bold hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => navigate('/signup')}
        >
          Not a member?...SIGNUP
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CyberGameEntry;
