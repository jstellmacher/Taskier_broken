import React, { useEffect, useState } from 'react';

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/users/:id'); // Replace :id with the actual user ID
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log('Error fetching user:', response.status);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>User Information</h1>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created At: {user.created_at}</p>
          <h2>Tasks:</h2>
          <ul>
            {user.tasks.map((task) => (
              <li key={task.id}>
                <p>ID: {task.id}</p>
                <p>Title: {task.title}</p>
                <p>Description: {task.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Account;
