import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
    <div className="form">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <br />
        <input
          type="checkbox"
          checked={highPriority}
          onChange={handleHighPriorityChange}
        />
        <label htmlFor="highPriority">High Priority</label>
        <br />
        <button className="button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
