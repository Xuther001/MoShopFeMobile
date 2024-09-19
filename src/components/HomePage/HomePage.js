import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
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

  return (
    <div className="home-page">
      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="signup-link">Sign Up</Link>
          </>
        ) : (
          <>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
            <button className="mycart-button" onClick={handleCartClick}>My Cart</button>
            <button className="myinvoice-button" onClick={handleInvoiceClick}>My Invoices</button>
          </>
        )}
      </div>
      <ProductList />
    </div>
  );
}

export default HomePage;