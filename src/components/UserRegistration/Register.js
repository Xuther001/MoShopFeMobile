import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../configs/axiosConfig';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [message, setMessage] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstname':
      case 'lastname':
      case 'state':
      case 'country':
        // Updated regex to allow letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} must only contain letters and spaces.`;
        }
        break;
      case 'city':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'City must only contain letters and spaces.';
        }
        break;
      case 'postalCode':
        if (!/^[0-9]+$/.test(value)) {
          error = 'Postal code must only contain numbers.';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Email should be valid.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submission
    if (Object.values(errors).some((error) => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      const { token, username, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);
      console.log('Registration successful:', response.data);
      setMessage('Registration successful!');

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {message && (
        <>
          <p className="success-message">{message}</p>
          <p>You will be redirected in {countdown} seconds...</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        {errors.firstname && <p className="error-message">{errors.firstname}</p>}

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        {errors.lastname && <p className="error-message">{errors.lastname}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <p className="error-message">{errors.city}</p>}

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        {errors.state && <p className="error-message">{errors.state}</p>}

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        {errors.country && <p className="error-message">{errors.country}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;