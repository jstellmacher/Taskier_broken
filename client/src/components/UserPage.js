import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';
import TaskCard from './TaskCard';
import TaskListCard from './TaskListCard';

const UserPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5555/users/${id}`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TaskListCard tasks={tasks} />
    </div>
  );
};

export default UserPage;
