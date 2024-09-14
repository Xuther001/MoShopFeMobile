import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <ProductList />
      <Link to="/register" className="signup-link">Sign up</Link>
    </div>
  );
};

export default HomePage;