import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddTask() {
    const [task, setTask] = useState('');
    const history = useHistory();
  
    const handleTaskChange = (e) => {
      setTask(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5555/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: task,
          }),
        });
  
        if (response.ok) {
          history.push(`/users/1`); // Replace 1 with the appropriate user ID
        } else {
          console.log('Failed to add task');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={task} onChange={handleTaskChange} />
          <button type="submit">Add Task</button>
        </form>
      </div>
    );
  };

export default AddTask;