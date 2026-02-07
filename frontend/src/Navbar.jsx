import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <nav className={isOpen ? "nav-menu active" : "nav-menu"}>
        <ul onClick={() => setIsOpen(false)}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search Hotels</Link></li>
          <li><Link to="/featured">Featured Hotels</Link></li>
          <li><Link to="/my-bookings">My Bookings</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;