import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (data) => {
        console.log('Login successful:', data);
        navigate('/');
    };

    return (
        <div className="login-page-container">
            <div className="top-panel">
                <div className="still-dont-have">Still don't have an account?</div>
                <button className="sign-up-button" onClick={() => navigate('/join')}>Sign up</button>
            </div>
            <div className="login-content">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <div className="right-image-container">
                    <img src="/src/assets/logo-bird.png" alt="Bird" className="bird-image" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
