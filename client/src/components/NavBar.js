import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navItemClasses =
    "text-white ml-4 transition-colors duration-300 focus:text-gray-200 focus:outline-none";
  const navBarClasses = "bg-gradient-to-r from-orange-500 to-yellow-500";
  const ulClasses = "flex justify-between items-center p-4";
  const liClasses = "inline-flex items-center";
  const separatorClasses = "border-l border-gray-300 h-4 mx-2";

  return (
    <nav className={navBarClasses}>
      <ul className={ulClasses}>
        <li className={`${liClasses}`}>
          <Link
            to="/"
            className={`${navItemClasses} hover:bg-gray-200 hover:text-gray-800 font-bold text-lg`}
          >
            Home
          </Link>
        </li>
        <li className={`${liClasses} ml-auto space-x-4`}>
          <Link
            to="/users"
            className={`${navItemClasses} hover:bg-gray-200 hover:text-gray-800`}
          >
            Users
          </Link>
          <div className={separatorClasses}></div>
          <Link
            to="/tasks"
            className={`${navItemClasses} hover:bg-gray-200 hover:text-gray-800`}
          >
            Tasks
          </Link>
          <div className={separatorClasses}></div>
          <Link
            to="/authentication"
            className={`${navItemClasses} hover:bg-gray-200 hover:text-gray-800`}
          >
            Authentication
          </Link>
          <div className={separatorClasses}></div>
          <Link
            to="/todos"
            className={`${navItemClasses} hover:bg-gray-200 hover:text-gray-800`}
          >
            Todos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
