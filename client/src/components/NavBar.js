import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FiInfo, FiHome, FiCalendar, FiSmile } from 'react-icons/fi';
import { GiExitDoor } from 'react-icons/gi';

const containerStyles = 'flex items-center justify-between p-4';
const itemStyles = 'flex items-center';
const logoStyles = 'h-8 w-8 mr-2 hover:animate-pulse'; // Adjusted size for larger icons and added hover:pulse class
const textStyles = 'font-bold';
const logoutStyles = 'hover:animate-pulse';

function NavBar() {
  const history = useHistory();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Perform logout action here
      // For example, you can clear the session, remove tokens, or reset user data

      // After logout, redirect the user to the login page or home page
      history.push('/login');
    }
  };

  return (
    <nav>
      <ul className={containerStyles}>
        <li className={itemStyles}>
          <NavLink exact to="/" activeClassName="text-blue-500">
            <FiHome className={logoStyles} />
          </NavLink>
          <span className={textStyles}>Home</span>
        </li>
        <li className={itemStyles}>
          <NavLink to="/users/:id/calendar" activeClassName="text-blue-500">
            <FiCalendar className={logoStyles} />
          </NavLink>
          <Link to="/users/:id/account">
            <FiInfo className={logoStyles} />
          </Link>
          <NavLink to="/about" activeClassName="text-blue-500">
            <FiSmile className={logoStyles} />
          </NavLink>
          <div className={logoutStyles} onClick={handleLogout}>
            <GiExitDoor className={logoStyles} />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
