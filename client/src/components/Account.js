import React, { useEffect, useState } from 'react';

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const titleStyles = "text-2xl font-bold text-center";
const loadingStyles = "text-center";

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
    <div className={containerStyles}>
      <div className={cardStyles}>
        <h1 className={titleStyles}>User Information</h1>
        {user ? (
          <div>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Created At: {user.created_at}</p>
          </div>
        ) : (
          <p className={loadingStyles}>Loading user information...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
