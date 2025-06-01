import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const payload = {
                username: formData.username,
                password: formData.password
            };
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            onLoginSuccess(data);
            localStorage.setItem('authToken', data.key);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form-container">
            <div className="logo">
                <span className="logo-text">InspiArt</span>
                <span className="logo-feather" role="img" aria-label="feather">🪶</span>
            </div>
            <h2 className="login-heading">Sign in to see your inspirations:</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="error-message">{error}</div>}
                <label htmlFor="username" className="input-label">Username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="username"
                    required
                />
                <label htmlFor="password" className="input-label">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="password"
                    required
                />
                <button type="submit" className="login-button">Log in</button>
            </form>
            <div className="forgot-password-section">
                <span className="forgot-password-text">Forgot password?</span>
                <a href="/forgot-password" className="forgot-password-link">Click here</a>
            </div>
        </div>
    );
};

export default LoginForm;
