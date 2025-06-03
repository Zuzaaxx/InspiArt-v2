import React from 'react';
import Navigation from './Navigation';
import './IdeaView.css';

const IdeaView = () => {
    return (
        <div className="container">
            <Navigation />
            <div className="idea-container">
                <h1>pomysł</h1>
            </div>
        </div>
    );
};

export default IdeaView;
