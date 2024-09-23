import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../configs/axiosConfig';
import './PasswordChangeRequest.css';

const PasswordChangeRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/request-password', null, {
        params: { email },
      });
      setMessage(response.data);
      setError(null);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        navigate('/');
      }, 5000);

    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setMessage(null);
    }
  };

  return (
    <div className="password-change-request-container">
      <h2>Request Password Change</h2>
      {message && (
        <>
          <p className="success-message">{message}</p>
          <p>You will be redirected in {countdown} seconds...</p>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRequest}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Password Reset</button>
      </form>
    </div>
  );
};

export default PasswordChangeRequest;