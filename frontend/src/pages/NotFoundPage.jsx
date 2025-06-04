import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-end items-center bg-gradient-to-b from-[#ffffff] to-[#f5e9aa] pb-12 box-border relative">
      <h1 className="text-white text-6xl font-bold mb-5 drop-shadow-lg z-10">404</h1>
      <h2 className="text-white text-3xl font-bold mb-5 drop-shadow-lg z-10">not found</h2>
      <img src="/src/assets/logo-bird.png" alt="Logo Bird" className="w-80 object-contain z-0" />
    </div>
  );
};

export default NotFoundPage;
