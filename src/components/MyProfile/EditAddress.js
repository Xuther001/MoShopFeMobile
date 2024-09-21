import React, { useState } from 'react';
import axios from '../../configs/axiosConfig';

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
      userAddresses: [
        {
          id: userAddress.id,
          streetAddress,
          city,
          state,
          postalCode,
          country,
        }
      ]
    };

    try {
      const response = await axios.put(`/api/users/${userId}`, updatedAddress, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdate(response.data);
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Address</h2>
      <input
        type="text"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
        placeholder="Street Address"
        required
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        required
      />
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Postal Code"
        required
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditAddress;