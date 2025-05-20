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
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <p>Don't have an account? <Link to="/join">Join here</Link></p>
        </div>
    );
};

export default LoginPage;
