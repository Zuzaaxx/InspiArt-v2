import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './LoginPage.css';

const SignUpPage = () => {
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
          <img className="decoration-top" alt="" src="/src/assets/Vector 1.svg" />
        </div>

        <img className="decoration-bottom" alt="" src="/src/assets/Vector 2.svg" />
      </div>
    </div>
  );
};

export default SignUpPage;
