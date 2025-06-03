import React from 'react';
import Navigation from './Navigation';
import './LeftAligned.css';

const FavouriteIdeas = () => {
    return (
        <div className="left-aligned-container">
            <Navigation />
            <h2>Favourite Ideas</h2>
            <p>This is the Favourite Ideas page.</p>
        </div>
    );
};

export default FavouriteIdeas;
