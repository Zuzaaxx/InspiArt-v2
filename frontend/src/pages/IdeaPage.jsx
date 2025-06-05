import React from 'react';
import Navigation from '../components/Navigation';

const IdeaPage = ({ idea }) => {
  return (
    <div className="container">
      <Navigation />
      <div className="base-container">
        <img className="decoration-top" alt="" src="public/img/Vector 3.svg" />
        <div className="top-leyer">
          <div className="search-bar" style={{ visibility: 'hidden' }}>
            <input placeholder="search idea" />
          </div>
          <div className="section">
            <div className="idea" id={idea?.id || ''}>
              <img src={idea?.image || ''} alt={idea?.title || 'Idea'} />
              <div className="idea-text">
                <h3>{idea?.title || 'Title'}</h3>
                <p>{idea?.description || 'Description'}</p>
                <div className="social-section">
                  <i className="fas fa-heart"></i>
                  <i className="fa-solid fa-image"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="decoration-bottom" alt="" src="public/img/Vector 4.svg" />
      </div>
    </div>
  );
};

export default IdeaPage;
