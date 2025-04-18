import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/enhancement">Image Enhancement</Link></li>
        <li><Link to="/detection">Object Detection</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
