import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/home.png';
import calendarImage from '../assets/calendar.png';
import accountImage from '../assets/account.png';
import taskierImage from '../assets/taskier.png';

function NavBar() {
  return (
    <nav>
      <ul className="navbar">
        <li className="navbarLi">
          <Link to="/"><img src={homeImage} alt="Home" style={{ height: '20%' }} /></Link>
          <Link to="/users/:id/calendar"><img src={calendarImage} alt="Calendar" style={{ height: '20%' }} /></Link>
          <Link to="/users/:id/account"><img src={accountImage} alt="Account" style={{ height: '20%' }} /></Link>
          <Link to="/about"><img src={taskierImage} alt="Taskier" style={{ height: '20%' }} /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
