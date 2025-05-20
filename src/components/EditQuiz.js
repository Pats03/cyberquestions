import { useState, useEffect } from 'react';

export default function EditQuiz({ initialData, id, onClose }) {
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

  useEffect(() => {
    if (initialData) {
      setQuiz({
        question: initialData.question || '',
        options: Array.isArray(initialData.options)
          ? initialData.options
          : ['', '', '', ''],
        answer: initialData.answer || '',
        description: initialData.description || '',
        difficulty: initialData.difficulty || 'easy',
        role: initialData.role || '',
        category: initialData.category || '',
        link: initialData.link || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...quiz.options];
    newOptions[index] = value;
    setQuiz({ ...quiz, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    if (!id) {
      console.error('No ID provided for updating quiz');
      return;
    }
    console.log(id);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/quiz/quiz/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quiz),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update quiz');
      }
      console.log('Quiz updated successfully');
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-green-500">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Quiz</h2>
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
          <option value="HR">HR</option>
          <option value="Junior Data Analyst">Junior Data Analyst</option>
          <option value="Senior Data Analyst">Senior Data Analyst</option>
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
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-green-500 hover:bg-green-700 transition duration-300 text-black font-bold"
          >
            Update Quiz
          </button>
          <button
            type="button"
            className="w-full p-3 rounded-md bg-gray-500 hover:bg-gray-700 transition duration-300 text-white font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
