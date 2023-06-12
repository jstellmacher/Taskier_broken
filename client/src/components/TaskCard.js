import React from 'react';

const containerStyles = "taskCard";
const topRowStyles = "flex justify-between items-center";
const titleStyles = "taskCardTitle";
const priorityStyles = (highPriority) => {
  return `taskCardPriority ${highPriority ? 'bg-green-500' : 'bg-red-500'}`;
};
const descriptionStyles = "taskCardDescription";

function TaskCard({ task }) {
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
    <div className={containerStyles} key={task.id}>
      <div className={topRowStyles}>
        <div className={titleStyles}>{task.title}</div>
        <div className={priorityStyles(task.high_priority)}>
          {task.high_priority ? 'High Priority' : 'Low Priority'}
        </div>
      </div>
      <div className="taskCardBottomRow">
        <div className={descriptionStyles}>{task.description}</div>
      </div>
      {/* <div className="taskCardStatus"> */}
      {/* <button onClick={() => handleStatusUpdate('todo')}>To Do</button>
        <button onClick={() => handleStatusUpdate('in progress')}>In Progress</button>
        <button onClick={() => handleStatusUpdate('done')}>Done</button> */}
      {/* </div> */}
    </div>
  );
}

export default TaskCard;
