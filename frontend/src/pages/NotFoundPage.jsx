import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-404">404</h1>
      <h2 className="notfound-text">not found</h2>
      <img src="/src/assets/logo-bird.png" alt="Logo Bird" className="notfound-logo-bird" />
    </div>
  );
};

export default NotFoundPage;
