import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Link to="/register" className="signup-link">Sign Up</Link>
      <Link to="/login" className="login-link">Login</Link>
      <ProductList />
    </div>
  );
}

export default HomePage;