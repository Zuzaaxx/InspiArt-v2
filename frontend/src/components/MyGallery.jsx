import React from 'react';
import Navigation from './Navigation';

const MyGallery = ({ projects }) => {
  // projects is an array of { id, image, title, description }

  return (
    <div className="container">
      <Navigation />
      <div className="base-container">
        <img className="decoration-top" alt="" src="public/img/Vector 3.svg" />
        <div className="top-leyer">
          <div className="search-bar">
            <input placeholder="search idea" />
          </div>
          <div className="section">
            {projects && projects.length > 0 ? (
              projects.map(project => (
                <div className="idea" id={project.id} key={project.id}>
                  <img src={project.image} alt={project.title} />
                  <div className="idea-text">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="social-section">
                      <i className="fas fa-heart"></i>
                      <i className="fa-solid fa-image"></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
          <button className="add-idea-button" onClick={() => window.location.href='addProject'}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <img className="decoration-bottom" alt="" src="public/img/Vector 4.svg" />
      </div>
    </div>
  );
};

export default MyGallery;
