import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/v1/quiz/scores-by-jobrole',
          {
            withCredentials: true, // Ensures cookies (token) are sent
          }
        );

        // Extract scores array from response and sort it
        const sortedData = response.data.scores.sort(
          (a, b) => b.score - a.score
        );

        // Update state
        setLeaderboardData(sortedData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);
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

  // Function to format email (remove domain after @)
  const formatEmail = (email) => {
    return email ? email.split('@')[0] : 'Unknown';
  };

  // Get job role of the first-ranked user (or fallback to null)
  const topUserJobRole =
    leaderboardData.length > 0 ? leaderboardData[0]?.userId?.jobrole : null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">CyberClan</h1>
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition text-sm font-bold"
      >
        Logout
      </button>
      <div className="w-full max-w-4xl overflow-x-auto">
        {loading ? (
          <p className="text-xl text-green-500">Loading...</p>
        ) : (
          <table className="w-full border border-green-500 text-center">
            <thead>
              <tr className="bg-green-500 text-black">
                <th className="p-2 border">Place</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Job Role</th>
                <th className="p-2 border">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 border-b border-green-500"
                >
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {formatEmail(entry.userId?.email)}
                  </td>
                  <td className="p-2 border">
                    {entry.userId?.jobrole || 'Unknown'}
                  </td>
                  <td className="p-2 border">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        className="mt-6 px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400"
        onClick={() => {
          if (topUserJobRole) {
            navigate(`/quiz/${topUserJobRole}`);
          } else {
            alert('No job role found!');
          }
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default Leaderboard;
