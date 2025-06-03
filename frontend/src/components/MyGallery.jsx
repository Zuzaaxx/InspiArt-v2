import React from 'react';
import Navigation from './Navigation';
import './LeftAligned.css';

const MyGallery = () => {
    return (
        <div className="left-aligned-container">
            <Navigation />
            <h2>My Gallery</h2>
            <p>This is the My Gallery page.</p>
        </div>
    );
};

export default MyGallery;
