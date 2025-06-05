import React from 'react';
import Navigation from '../components/Navigation';

const AdvancedPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] font-sans">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-[#4a3a1a]">Witaj adminie!</h1>
        <p className="text-xl text-[#4a3a1a]">Miłego dnia</p>
      </div>
    </div>
  );
};

export default AdvancedPage;
