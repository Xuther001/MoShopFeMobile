// src/components/MyProfile/MyProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/api/users/${username}`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [username]);

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>First Name:</strong> {profileData.firstName}</p>
      <p><strong>Last Name:</strong> {profileData.lastName}</p>
      <p><strong>Address:</strong> {profileData.address}</p>
    </div>
  );
}

export default MyProfile;