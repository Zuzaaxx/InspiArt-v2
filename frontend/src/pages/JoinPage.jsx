import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="login-container">
        <div className="inspiart" style={{ marginTop: 0, paddingTop: 0 }}>
          <span className="inspiart-text">InspiArt</span>
          <span role="img" aria-label="feather">🪶</span>
        </div>
        <RegisterForm />
      </div>

      <div className="base-container">
        <div className="top-panel">
          <div className="sign-up-section">
            <div className="still-dont-have">Already have an account?</div>
            <button className="sign-up" onClick={() => navigate('/login')}>
              Log in
            </button>
          </div>
        </div>

        <div className="logo-picture">
          <img src="/src/assets/logo-bird.png" alt="Logo Bird" />
        </div>

        <img className="decoration-bottom" alt="" src="/src/assets/Vector 2.svg" />
      </div>
    </div>
  );
};

export default SignUpPage;
