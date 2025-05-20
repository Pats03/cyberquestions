import React, { useState } from 'react';
import {
  Edit,
  Calendar,
  User,
  FileText,
  Trash,
  List,
  CheckCircle,
  Link as LinkIcon,
} from 'lucide-react';
import EditQuiz from './EditQuiz';
import axios from 'axios';

const QuestionCard = ({ questionData, index, id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };


 const handleDelete = async () => {
   try {
     await axios.delete(`http://localhost:4000/api/v1/quiz/quiz/${id}`);
     alert('Quiz deleted successfully!');
     // Optionally, refresh the quiz list or update state
     window.location.reload();
  
   } catch (error) {
     console.error('Error deleting quiz:', error);
     alert('Failed to delete quiz.');
   }
 };


  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-3xl border-2 border-gray-600">
      {isEditing ? (
        <EditQuiz
          initialData={questionData}
          id={id}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <div className="flex items-center space-x-4 border-b-2 border-gray-700 pb-3 mb-4">
            {/* Display actual index instead of '1' */}
            <div className="w-12 h-12 bg-teal-600 flex items-center justify-center rounded-full text-2xl font-bold">
              {index + 1}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-teal-300">
                {questionData.question}
              </h2>
              <p className="text-sm text-gray-400">{questionData.category}</p>
            </div>
          </div>
          <div className="space-y-4">
            {/* User role */}
            <div className="flex items-center space-x-3">
              <User size={18} className="text-teal-500" />
              <span className="text-teal-200">{questionData.role}</span>
            </div>

            {/* Options */}
            <div>
              <h3 className="text-xl font-semibold text-gray-300 flex items-center space-x-2">
                <List size={20} className="text-yellow-400" />
                <span>Options</span>
              </h3>
              <div className="flex flex-wrap space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-yellow-400">1)</span>
                  <span className="text-gray-300">
                    {questionData.options?.[0] || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-yellow-400">2)</span>
                  <span className="text-gray-300">
                    {questionData.options?.[1] || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-yellow-400">3)</span>
                  <span className="text-gray-300">
                    {questionData.options?.[2] || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-yellow-400">4)</span>
                  <span className="text-gray-300">
                    {questionData.options?.[3] || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Answer */}
            <div className="flex items-center space-x-3">
              <CheckCircle size={18} className="text-green-400" />
              <span className="text-green-300 font-semibold">
                Answer: {questionData.answer || 'N/A'}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-300 flex items-center space-x-2">
                <FileText size={20} className="text-blue-400" />
                <span>Description</span>
              </h3>
              <span className="text-gray-200">
                {questionData.description || 'N/A'}
              </span>
            </div>

            {/* Difficulty */}
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-2 rounded-lg text-white ${
                  questionData.difficulty === 'easy'
                    ? 'bg-green-500'
                    : questionData.difficulty === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {questionData.difficulty
                  ? questionData.difficulty.toUpperCase()
                  : 'N/A'}
              </span>
            </div>

            {/* Resource Link */}
            <div className="flex items-center space-x-3">
              <LinkIcon size={18} className="text-purple-400" />
              <a
                href={questionData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {questionData.link ? 'Resource Link' : 'No Link Available'}
              </a>
            </div>
          </div>

          <div className="mt-5 flex space-x-4">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
              onClick={handleEdit}
            >
              <Edit size={16} className="inline" /> <span>Edit</span>
            </button>

            <button
              className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
              onClick={handleDelete}
            >
              <Trash size={16} className="inline" /> <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
