import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-500">
      <ul className="flex justify-between items-center p-4">
        <li>
          <Link to="/" className="text-white font-bold text-lg">
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" className="text-white hover:text-gray-200 ml-4">
            Users
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="text-white hover:text-gray-200 ml-4">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/authentication" className="text-white hover:text-gray-200 ml-4">
            Authentication
          </Link>
        </li>
        <li>
          <Link to="/todos" className="text-white hover:text-gray-200 ml-4">
            Todos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
