import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/home.png';
import calendarImage from '../assets/calendar.png';

function NavBar() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/"><img src={homeImage} alt="Home" style={{ width: '8%' }} /></Link>
          <Link to="/users/:user_id/calendar"><img src={calendarImage} alt="Calendar" style={{ width: '8%' }} /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
