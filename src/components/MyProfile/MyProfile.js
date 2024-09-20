import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import './MyProfile.css';

const MyProfile = () => {
  const [addresses, setAddresses] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/address`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [userId, token]);

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      {addresses.length > 0 ? (
        <div className="address-list">
          {addresses.map((address) => (
            <div key={address.id} className="address-card">
              <p><strong>Street Address:</strong> {address.streetAddress}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>State:</strong> {address.state}</p>
              <p><strong>Postal Code:</strong> {address.postalCode}</p>
              <p><strong>Country:</strong> {address.country}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  );
};

export default MyProfile;