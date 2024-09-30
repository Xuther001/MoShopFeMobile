import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Clothing from '../Clothing/Clothing';
import Footwear from '../Footwear/Footwear';
import Eyewear from '../Eyewear/Eyewear';
import './HomePage.css';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCartClick = () => {
    if (username) {
      navigate(`/cart/${username}`);
    }
  };

  const handleInvoiceClick = () => {
    if (username) {
      navigate(`/invoice/${username}`);
    }
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  const handleAboutClick = () => {
    navigate('/about-site');
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="home-page">
      <div className="nav-strip">
        <div className={`auth-links ${isLoggedIn ? 'logged-in' : ''}`}>
          <span className="about-site" onClick={handleAboutClick}>About Site</span>
          {!isLoggedIn ? (
            <>
              <span onClick={() => navigate('/login')}>Login</span>
              <span onClick={() => navigate('/register')}>Sign Up</span>
            </>
          ) : (
            <>
              <span onClick={handleLogout}>Log Out</span>
              <span onClick={handleCartClick}>My Cart</span>
              <span onClick={handleInvoiceClick}>My Invoices</span>
              <span onClick={handleProfileClick}>My Profile</span>
            </>
          )}
        </div>
      </div>

      <div className="categories-strip">
        <button onClick={togglePanel}>
          &#9776; View By Category
        </button>
      </div>

      <div className={`sliding-panel ${isPanelOpen ? 'open' : ''}`}>
        <button className="close-panel-btn" onClick={togglePanel}>
          Close
        </button>
        <ul>
          <li>
            <Link to="/clothing-category">Clothing</Link>
          </li>
          <li>
            <Link to="/footwear-category">Footwear</Link>
          </li>
          <li>
            <Link to="/eyewear-category">Eyewear</Link>
          </li>
        </ul>
      </div>

      {isPanelOpen && <div className="overlay" onClick={togglePanel}></div>}
      <div className="products">
        <Clothing />
        <Eyewear />
        <Footwear />
      </div>
    </div>
  );
}

export default HomePage;