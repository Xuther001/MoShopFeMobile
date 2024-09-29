import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Clothing from '../Clothing/Clothing';
import Footwear from '../Footwear/Footwear';
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

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="home-page">
      <div className="auth-buttons">
        <button className="common-button" onClick={togglePanel}>
          &#9776; Categories
        </button>
        <button to="/about-site" className="common-button">About Site</button>
        {!isLoggedIn ? (
          <div className="login-signup-group">
            <Link to="/login" className="common-button">Login</Link>
            <Link to="/register" className="common-button">Sign Up</Link>
          </div>
        ) : (
          <div className="logged-in-buttons">
            <button className="common-button logout-button" onClick={handleLogout}>Log Out</button>
            <button className="common-button" onClick={handleCartClick}>My Cart</button>
            <button className="common-button" onClick={handleInvoiceClick}>My Invoices</button>
            <button className="common-button" onClick={handleProfileClick}>My Profile</button>
          </div>
        )}
      </div>

      <div className={`sliding-panel ${isPanelOpen ? 'open' : ''}`}>
        <button className="close-panel-btn" onClick={togglePanel}>
          &times;
        </button>
        <ul>
          <li>
            <Link to="/clothing-category">Clothing</Link> {/* Link to ClothingCategory */}
          </li>
          <li>
            <Link to="/footwear-category">Footwear</Link> {/* Assuming a similar page exists */}
          </li>
        </ul>
      </div>

      {isPanelOpen && <div className="overlay" onClick={togglePanel}></div>}

      <Clothing className="clothing-component" />
      <Footwear />
    </div>
  );
}

export default HomePage;