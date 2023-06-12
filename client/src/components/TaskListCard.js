import React, { useState } from 'react';
import TaskCard from './TaskCard';

const containerStyles = "taskListCard";
const headingStyles = "text-2xl font-bold";
const labelStyles = "block mt-4";
const selectStyles = "formSelect w-full border-2 border-gray-300 rounded-md mb-4 p-2";

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
    <div className={containerStyles}>
      <h3 className={headingStyles}>Tasks:</h3>
      <div className="flex flex-col">
        <label htmlFor="sortOption" className={labelStyles}>Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange} className={selectStyles}>
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
