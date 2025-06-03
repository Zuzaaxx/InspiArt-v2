import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import './LoginPage.css'

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (data) => {
        console.log('Login successful:', data);
        navigate('/');
    };

    return (
        <div className="container">
            <LoginForm onLoginSuccess={handleLoginSuccess} />

            <div className="base-container">
                <div className="top-panel">
                    <img
                        className="decoration-top"
                        alt=""
                        src="/src/assets/Vector 1.svg"
                    />
                    <div className="sign-up-section">
                        <div className="still-dont-have">Still don't have an account?</div>
                        <button className="sign-up" onClick={() => navigate('/join')}>
                            Sign up
                        </button>
                    </div>
                </div>

                <img
                    className="decoration-bottom"
                    alt=""
                    src="/src/assets/Vector 2.svg"
                />
            </div>
        </div>
    );
};

export default LoginPage;