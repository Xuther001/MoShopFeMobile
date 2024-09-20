import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/UserRegistration/Register';
import Login from './components/Login/Login';
import MyCart from './components/MyCart/MyCart';
import MyInvoice from './components/MyInvoice/MyInvoice';
import MyProfile from './components/MyProfile/MyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invoice/:username" element={<MyInvoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart/:username" element={<MyCart />} />
        <Route path="/profile/:username" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
