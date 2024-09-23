import React, { useState } from 'react';
import axios from '../../configs/axiosConfig';
import './PasswordChangeRequest.css';

const PasswordChangeRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/request-password', null, {
        params: { email },
      });
      setMessage(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setMessage(null);
    }
  };

  return (
    <div className="password-change-request-container">
      <h2>Request Password Change</h2>
      {message && <p className="success-message">{message}</p>}
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