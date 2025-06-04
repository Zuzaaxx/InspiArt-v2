import React from 'react';
import Navigation from '../components/Navigation';

const FavouriteIdeasPage = ({ favouriteIdeas }) => {
  // favouriteIdeas is an array of { id, image, title, description }

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
            {favouriteIdeas && favouriteIdeas.length > 0 ? (
              favouriteIdeas.map(idea => (
                <div className="idea" id={idea.id} key={idea.id}>
                  <img src={idea.image} alt={idea.title} />
                  <div>
                    <h3>{idea.title}</h3>
                    <p>{idea.description}</p>
                    <div className="social-section">
                      <i className="fas fa-heart"></i>
                      <i className="fa-solid fa-image"></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No favourite ideas found.</p>
            )}
          </div>
        </div>
        <img className="decoration-bottom" alt="" src="public/img/Vector 4.svg" />
      </div>
    </div>
  );
};

export default FavouriteIdeasPage;
