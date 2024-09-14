import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import './HomePage.css';

function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
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
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        )}
      </div>
      <ProductList />
    </div>
  );
}

export default HomePage;