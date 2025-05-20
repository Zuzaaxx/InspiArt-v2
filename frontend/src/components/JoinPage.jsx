import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

const JoinPage = () => {
    return (
        <div>
            <UserForm onUserAdded={(data) => console.log('User added:', data)} />
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default JoinPage;
