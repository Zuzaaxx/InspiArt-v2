import React from 'react';

const PleaseLoginPage = () => {
  return (
    <div className="h-screen flex flex-col justify-end items-center bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] pb-12 box-border relative">
      <h1 className="text-white text-3xl font-bold mb-5 drop-shadow-lg z-10">Please login first 😇</h1>
      <img src="/src/assets/logo-bird.png" alt="Logo Bird" className="w-80 object-contain z-0" />
    </div>
  );
};

export default PleaseLoginPage;
