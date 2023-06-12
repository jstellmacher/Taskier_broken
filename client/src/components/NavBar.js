import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/">
            <FiHome className={logoStyles} />
          </Link>
          <span className={textStyles}>Home</span>
        </li>
        <li className={itemStyles}>
          <Link to="/users/:id/calendar">
            <FiCalendar className={logoStyles} />
          </Link>
          <Link to="/users/:id/account">
            <FiInfo className={logoStyles} />
          </Link>
          <Link to="/about">
            <FiSmile className={logoStyles} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
