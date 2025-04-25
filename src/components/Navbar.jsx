import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/project" className={({ isActive }) => isActive ? 'active' : ''}>Project Details</NavLink></li>
        <li><NavLink to="/enhancement" className={({ isActive }) => isActive ? 'active' : ''}>Image Enhancement</NavLink></li>
        <li><NavLink to="/detection" className={({ isActive }) => isActive ? 'active' : ''}>Object Detection</NavLink></li>
        <li><NavLink to="/literature" className={({ isActive }) => isActive ? 'active' : ''}>Literature Survey</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
