import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/UserRegistration/Register';
import Login from './components/Login/Login';
import MyCart from './components/MyCart/MyCart';
import MyInvoice from './components/MyInvoice/MyInvoice';
import MyProfile from './components/MyProfile/MyProfile';
import PasswordChangeRequest from './components/PasswordChangeRequest/PasswordChangeRequest';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AboutSite from './components/AboutSite/AboutSite';
import ClothingCategory from './components/ClothingCategory/ClothingCategory';
import FootwearCategory from './components/FootwearCategory/FootwearCategory';
// import Clothing from './components/Clothing/Clothing';
// import Footwear from './components/Footwear/Footwear';

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
        <Route path="/passwordchangerequest" element={<PasswordChangeRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about-site" element={<AboutSite />} />
        <Route path="/clothing-category" element={<ClothingCategory />} />
        <Route path="/footwear-category" element={<FootwearCategory />} />
        {/* <Route path="/clothing" element={<Clothing />} />
        <Route path="/footwear" element={<Footwear />} />  */}
      </Routes>
    </Router>
  );
}

export default App;