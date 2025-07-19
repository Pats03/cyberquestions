import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `https://cybersecuirty-backend.vercel.app/api/v1/quiz/quiz/${role}`
        );
        setQuizData(response.data);
      } catch (err) {
        setError('Failed to load quiz data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      fetchQuizData();
    }
  }, [role]);

  const handleSelect = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    setSelected((prev) => ({ ...prev, [index]: value }));
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

const handleSubmit = async () => {
  setSubmitted(true);

  // Ensure score is calculated
  const totalQuestions = quizData.length;
  const correctAnswers = quizData.filter(
    (quiz, index) => selected[index] === quiz.options.indexOf(quiz.answer)
  ).length;
  const score = correctAnswers * 4; // Score logic

  const scoreData = { score }; // Send only the updated score

  try {
   await axios.post(
     'https://cybersecuirty-backend.vercel.app/api/v1/quiz/update-score',
     scoreData,
    //  {
    //    withCredentials: true,
    //  }
   );

  } catch (err) {
    console.error('Failed to update score:', err);
  }
};


  const totalQuestions = quizData.length;
  const correctAnswers = quizData.filter(
    (quiz, index) => selected[index] === quiz.options.indexOf(quiz.answer)
  ).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const score = correctAnswers * 4;
  const percentage = ((score / (totalQuestions * 4)) * 100).toFixed(1);

  let performanceMessage = '';
  if (percentage >= 90) {
    performanceMessage =
      '🌟 Excellent performance! You truly understand the concepts.';
  } else if (percentage >= 75) {
    performanceMessage = '👏 Great job! Keep practicing to reach excellence.';
  } else if (percentage >= 50) {
    performanceMessage =
      '🙂 Good effort! A little more practice will get you there.';
  } else {
    performanceMessage =
      '⚠️ Keep learning! Understanding the basics will help improve your score.';
  }

  let reattemptMessage = '';
  if (percentage >= 90) {
    reattemptMessage =
      '✅ Excellent! No need to retake soon. Just revise after 10+ days.';
  } else if (percentage >= 75) {
    reattemptMessage = '⚡ Great! Retake in 7 days to reinforce your learning.';
  } else if (percentage >= 50) {
    reattemptMessage =
      '📅 Decent effort! Retake in 4 days for better understanding.';
  } else {
    reattemptMessage = '🚨 Retake in 2 days to improve your grasp on concepts.';
  }


  if (loading) {
    return <div className="text-center text-white">Loading quiz...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Cybersecurity Awareness Quiz
      </h1>
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition text-sm font-bold"
      >
        Logout
      </button>

      {submitted && (
        <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6 text-center border border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Quiz Summary
          </h2>

          <div className="flex justify-between items-center bg-gray-700 p-4 rounded-md mb-4">
            <div className="text-lg font-semibold text-white">
              ✅ Correct:{' '}
              <span className="text-green-400">{correctAnswers}</span>
            </div>
            <div className="text-lg font-semibold text-white">
              ❌ Wrong: <span className="text-red-400">{wrongAnswers}</span>
            </div>
          </div>

          <div className="text-lg font-semibold text-yellow-400">
            🎯 Score:{' '}
            <span className="text-yellow-300">
              {score} / {totalQuestions * 4}
            </span>
          </div>

          <div className="mt-2">
            <p className="text-blue-400 text-lg font-semibold">
              📊 Accuracy: {percentage}%
            </p>
            <p className="mt-2 text-white text-md font-light">
              {performanceMessage}
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-700 rounded-lg text-white">
            <h3 className="text-lg font-semibold text-yellow-400">
              📅 When to Retake the Quiz?
            </h3>
            <p className="text-md text-gray-300 mt-2">{reattemptMessage}</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </button>
          </div>
        </div>
      )}

      {quizData.map((quiz, index) => {
        const correctIndex = quiz.options.indexOf(quiz.answer);
        const selectedIndex = selected[index];

        return (
          <div
            key={index}
            className="bg-gray-800 p-6 mb-6 rounded-lg shadow-md w-full max-w-2xl"
          >
            <h2 className="text-lg font-bold mb-4 text-green-400">
              Question {index + 1}
            </h2>
            <p className="mb-4">{quiz.question}</p>

            {quiz.options && Array.isArray(quiz.options) ? (
              <ul>
                {quiz.options.map((option, i) => (
                  <li
                    key={i}
                    className={`p-2 border rounded mb-2 bg-gray-700 cursor-pointer ${
                      selectedIndex === i ? 'border-blue-400' : ''
                    }`}
                    onClick={() => handleSelect(index, i)}
                  >
                    {String.fromCharCode(97 + i)}. {option}
                  </li>
                ))}
              </ul>
            ) : null}

            {submitted && (
              <div className="mt-4">
                {!selected.hasOwnProperty(index) ? (
                  <p className="text-yellow-400 font-semibold">
                    ⚠️ You didn’t select an answer for this question.
                  </p>
                ) : selectedIndex === correctIndex ? (
                  <p className="text-green-400 font-semibold">
                    ✅ Well done! That's the correct answer!
                  </p>
                ) : (
                  <p className="text-red-400 font-semibold">
                    ❌ Not quite! The correct answer is:{' '}
                    <span className="text-green-400">{quiz.answer}</span>
                  </p>
                )}
                <p className="mt-2 text-green-400 font-semibold">
                  Explanation:
                </p>
                <p className="text-sm text-gray-300">{quiz.description}</p>
                <p className="text-sm text-blue-400 mt-2">
                  <a href={quiz.link} target="_blank" rel="noopener noreferrer">
                    Learn more
                  </a>
                </p>
              </div>
            )}
          </div>
        );
      })}

      {!submitted && (
        <button
          className="mt-6 px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;
