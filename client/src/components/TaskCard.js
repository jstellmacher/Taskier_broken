import React from 'react';

const TaskCard = ({ task }) => {
  const handleStatusUpdate = async (status) => {
    try {
      const response = await fetch(`http://localhost:5555/tasks/${task.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      if (response.ok) {
        console.log('Task status updated successfully');
        // You can add further logic or update the task locally if needed
      } else {
        console.log('Failed to update task status');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="taskCard" key={task.id}>
      <div className="taskCardTopRow">
        <div className="taskCardTitle">{task.title}</div>
        <div className="taskCardPriority">High Priority</div>
      </div>
      <div className="taskCardStatus">
        <button onClick={() => handleStatusUpdate('todo')}>To Do</button>
        <button onClick={() => handleStatusUpdate('in progress')}>In Progress</button>
        <button onClick={() => handleStatusUpdate('done')}>Done</button>
      </div>
    </div>
  );
};

export default TaskCard;