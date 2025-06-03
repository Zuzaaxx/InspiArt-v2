import React from 'react';
import Navigation from './Navigation';
import './LeftAligned.css';

const MyProfile = () => {
    return (
        <div className="left-aligned-container">
            <Navigation />
            <h2>My Profile</h2>
            <p>This is the My Profile page.</p>
        </div>
    );
};

export default MyProfile;
