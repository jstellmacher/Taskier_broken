import React from 'react';
import TaskCard from './TaskCard';

const TaskListCard = ({ tasks }) => {
  return (
    <div className="taskListCard">
      <h3>Tasks:</h3>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskListCard;
