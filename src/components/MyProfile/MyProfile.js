import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../configs/axiosConfig';
import EditAddress from './EditAddress';
import './MyProfile.css';

const MyProfile = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/address`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAddresses(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    }
  }, [userId, token]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleUpdateAddress = async (updatedAddress) => {
    try {
      await axios.put(`/api/users/${userId}`, updatedAddress, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchAddresses();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleEditClick = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAddress(null);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="nav-strip">
        <Link to="/" className="home-link">Home Page</Link>
      </div>

      <h1>My Profile</h1>
      {isEditing ? (
        <EditAddress 
          userAddress={currentAddress} 
          onUpdate={handleUpdateAddress} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <div>
          <h2>Address</h2>
          {addresses.length > 0 && addresses.map((address) => (
            <div className="address-card" key={address.id}>
              <div className="address-details">
                <div>
                  <span className="address-label">Street Address:</span>
                  <p>{address.streetAddress}</p>
                </div>
                <div>
                  <span className="address-label">City:</span>
                  <p>{address.city}</p>
                </div>
                <div>
                  <span className="address-label">State:</span>
                  <p>{address.state}</p>
                </div>
                <div>
                  <span className="address-label">Postal Code:</span>
                  <p>{address.postalCode}</p>
                </div>
                <div>
                  <span className="address-label">Country:</span>
                  <p>{address.country}</p>
                </div>
              </div>
              <button className="edit-button" onClick={() => handleEditClick(address)}>Edit Address</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProfile;