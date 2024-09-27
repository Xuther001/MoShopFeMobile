import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Clothing from '../Clothing/Clothing';
import Footwear from '../Footwear/Footwear';
import './HomePage.css';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
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

  return (
    <div className="home-page">
      <div className="auth-buttons">
        {!isLoggedIn ? (
          <div className="login-signup-group">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="signup-link">Sign Up</Link>
          </div>
        ) : (
          <div className="logged-in-buttons">
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
            <button className="mycart-button" onClick={handleCartClick}>My Cart</button>
            <button className="myinvoice-button" onClick={handleInvoiceClick}>My Invoices</button>
            <button className="myprofile-button" onClick={handleProfileClick}>My Profile</button>
          </div>
        )}
      </div>
      <Clothing className="clothing-component" />
      <Footwear />
    </div>
  );
}

export default HomePage;