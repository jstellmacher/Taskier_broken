import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5555/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTasks = (tasks) => {
    // Sort tasks by created_at in ascending order
    const sortedTasks = tasks.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    return sortedTasks.map((task) => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <h4>Tasks:</h4>
          {renderTasks(user.tasks)}
        </div>
      ))}
    </div>
  );
};

export default Users;
