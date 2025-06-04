import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    navigate('/start');
  };

  return (
    <div className="container">
      <div className="login-container">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>

      <div className="base-container">
        <div className="top-panel">
          <div className="sign-up-section">
            <div className="still-dont-have">Still don't have an account?</div>
            <button className="sign-up" onClick={() => navigate('/join')}>
              Sign up
            </button>
          </div>
        </div>

        <div className="logo-picture">
          <img src="/src/assets/logo-bird.png" alt="Logo Bird" />
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
