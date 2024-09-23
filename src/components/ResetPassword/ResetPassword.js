import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import { useLocation } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/reset-password', null, {
                params: { token, newPassword },
            });
            setMessage(response.data.message);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
            setMessage(null);
        }
    };

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing token.');
        }
    }, [token]);

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handlePasswordReset}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;