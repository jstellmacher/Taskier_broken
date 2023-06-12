import React, { useEffect, useState } from 'react';

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/users/4/account');
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
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Account;
