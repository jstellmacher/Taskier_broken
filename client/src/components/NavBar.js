import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiInfo, FiHome, FiCalendar, FiSmile } from 'react-icons/fi';

const containerStyles = 'flex items-center justify-between p-4';
const itemStyles = 'flex items-center';
const logoStyles = 'h-8 w-8 mr-2'; // Adjusted size for larger icons
const textStyles = 'font-bold';

function NavBar() {
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
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
