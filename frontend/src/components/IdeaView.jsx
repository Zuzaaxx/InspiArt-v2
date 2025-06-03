import React from 'react';

const IdeaView = ({ idea }) => {
  // idea prop should have { id, image, title, description }

  return (
    <div className="container">
      <nav>
        <div className="inspiart">
          <span className="inspiart-text">InspiArt</span>
          <span role="img" aria-label="feather">🪶</span>
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="start" className="menu-button" style={{ color: '#d46900' }}>
                <i className="fa-solid fa-house"></i>
                <p className="menu-button-text">Start</p>
              </a>
            </li>
            <li>
              <a href="favourites" className="menu-button">
                <i className="fa-solid fa-heart"></i>
                <p className="menu-button-text">Favourite ideas</p>
              </a>
            </li>
            <li>
              <a href="gallery" className="menu-button">
                <i className="fa-solid fa-image"></i>
                <p className="menu-button-text">My gallery</p>
              </a>
            </li>
            <li>
              <a href="profile" className="menu-button">
                <i className="fa-solid fa-user"></i>
                <p className="menu-button-text">My profile</p>
              </a>
            </li>
          </ul>
        </div>
        <button className="log-out" onClick={() => window.location.href='login'}>Log out</button>
      </nav>
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

export default IdeaView;
