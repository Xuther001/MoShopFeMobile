import React, { useState } from 'react';
import axios from '../../configs/axiosConfig';
import './EditAddress.css';

const EditAddress = ({ userAddress, onUpdate, onCancel }) => {
  const [streetAddress, setStreetAddress] = useState(userAddress.streetAddress);
  const [city, setCity] = useState(userAddress.city);
  const [state, setState] = useState(userAddress.state);
  const [postalCode, setPostalCode] = useState(userAddress.postalCode);
  const [country, setCountry] = useState(userAddress.country);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAddress = {
      streetAddress,
      city,
      state,
      postalCode,
      country,
      user: { 
        id: userId,
        username: localStorage.getItem('username')
      } 
    };

    try {
      await axios.put(`/api/users/${userId}`, updatedAddress, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdate(updatedAddress);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-address-form">
      <h2>Edit Address</h2>
      <div className="form-group">
        <label htmlFor="streetAddress">Street Address</label>
        <input type="text" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
    </form>
  );
};

export default EditAddress;