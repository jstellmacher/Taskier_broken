import React, { useState } from 'react';
import TaskCard from './TaskCard';

function TaskListCard({ tasks }) {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortTasks = (option) => {
    let sortedTasks = [];

    if (option === 'due_date_asc') {
      sortedTasks = tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    } else if (option === 'due_date_desc') {
      sortedTasks = tasks.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    } else if (option === 'date_created_asc') {
      sortedTasks = tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (option === 'date_created_desc') {
      sortedTasks = tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (option === 'priority') {
      sortedTasks = tasks.sort((a, b) => {
        if (a.high_priority && !b.high_priority) {
          return -1;
        } else if (!a.high_priority && b.high_priority) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return sortedTasks;
  };

  const sortedTasks = sortOption ? sortTasks(sortOption) : tasks;

  return (
    <div className="taskListCard">
      <h3>Tasks:</h3>
      <div>
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange}>
          <option value="">-- Select an option --</option>
          <option value="due_date_asc">Due Date (Old to New)</option>
          <option value="due_date_desc">Due Date (New to Old)</option>
          <option value="date_created_asc">Date Created (Old to New)</option>
          <option value="date_created_desc">Date Created (New to Old)</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      {sortedTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default TaskListCard;
