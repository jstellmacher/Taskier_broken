import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const formStyles = "mx-auto max-w-sm p-6 bg-white rounded-md shadow-md";
const inputStyles = "w-full px-4 py-2 mb-4 border border-gray-300 rounded-md";
const buttonStyles = "w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-900";

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [highPriority, setHighPriority] = useState(false);
  const history = useHistory();
  const { user_id } = useParams();

  const userId = user_id || '4'; // Use a default value if user_id is undefined

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHighPriorityChange = (e) => {
    setHighPriority(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5555/users/${userId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          high_priority: highPriority, // Include the highPriority value
        }),
      });

      if (response.ok) {
        history.push(`/users/${userId}`);
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${
        highPriority ? 'from-red-200 to-red-400' : 'from-green-900 to-teal-200'
      } min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className={formStyles}>
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={inputStyles}
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            className={inputStyles}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <div className="flex items-center">
            <input
              className="mr-2"
              type="checkbox"
              checked={highPriority}
              onChange={handleHighPriorityChange}
            />
            <label htmlFor="highPriority">High Priority</label>
          </div>
          <button
            className={`${buttonStyles} ${
              highPriority ? 'bg-red-200 hover:bg-red-400' : 'bg-green-900 hover:bg-green-500'
            }`}
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
