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
        <div className="login-container">
            <div className="inspiart">
            <span className="inspiart-text">InspiArt</span>
            <span role="img" aria-label="feather">🪶</span>
            </div>

            <div className="login-form">
            <p className="log-in-to">Log in to see your inspirations</p>
            <form onSubmit={handleSubmit}>
                <div className="message">
                {error && <div className="error-message">{error}</div>}
                </div>

                <p>Username:</p>
                <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={error ? 'no-valid' : ''}
                />

                <p>Password:</p>
                <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={error ? 'no-valid' : ''}
                />

                <button type="submit">Log in</button>
            </form>
            </div>

            <div className="forgot">
            <p className="forgot-password">Forgot password?</p>
            <p className="click-here" onClick={() => window.location.href = '/forgot-password'}>
                Click here
            </p>
            </div>
        </div>
    );

};

export default LoginForm;
