import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [jobrole, setJobrole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !role || (role === 'user' && !jobrole)) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await axios.post(
        'https://cybersecuirty-backend.vercel.app/api/v1/auth/register',
        {
          email: username,
          password,
          role,
          jobrole: role === 'user' ? jobrole : undefined,
        }
      );
      setSuccessMessage('User created successfully!');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating account.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
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

      <motion.div
        className="relative bg-gray-800 border border-green-500 rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h1 className="text-2xl font-extrabold text-green-400 mb-4">
          Cybersecurity Quiz - Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Organization Email"
            className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400 mt-4"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full bg-gray-800 text-gray-200 border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400 mt-4"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {role === 'user' && (
            <select
              value={jobrole}
              onChange={(e) => setJobrole(e.target.value)}
              required
              className="w-full bg-gray-800 text-gray-200 border border-gray-600 rounded-full px-4 py-2 text-center text-lg focus:outline-none focus:border-green-400 mt-4"
            >
              <option value="">Select Job Role</option>
              <option value="HR">HR</option>
              <option value="Junior Data Analyst">Junior Data Analyst</option>
              <option value="Senior Data Analyst">Senior Data Analyst</option>
            </select>
          )}

          {successMessage && (
            <p className="mt-4 text-green-400">{successMessage}</p>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          <motion.button
            type="submit"
            className="mt-6 bg-green-500 text-gray-900 rounded-full w-full py-2 font-bold hover:bg-green-600 transition"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            SUBMIT
          </motion.button>
        </form>
        <motion.button
          className="mt-4 bg-green-500 text-gray-900 rounded-full w-full py-2 font-bold hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => navigate('/login')}
        >
          Already a member? LOGIN
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Signup;
