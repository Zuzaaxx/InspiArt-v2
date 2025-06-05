import React from 'react';
import Navigation from '../components/Navigation';

const IdeaPage = ({ idea }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] font-sans">
      <Navigation />
      <div className="flex-1 relative p-8 overflow-hidden flex flex-col items-center shadow-inner shadow-[#c48a2f44]">
        <img
          className="absolute top-0 left-0 w-full pointer-events-none select-none opacity-50"
          alt=""
          src="/img/Vector 3.svg"
        />
        <div className="relative z-20 max-w-4xl w-full mt-20 text-center bg-white bg-opacity-90 rounded-xl p-8 shadow-md">
          <div id={idea?.id || ''} className="flex flex-col items-center">
            <img
              src={idea?.image || ''}
              alt={idea?.title || 'Idea'}
              className="rounded-md mb-6 max-h-96 object-contain"
            />
            <h3 className="text-3xl font-bold text-[#4a3a1a] mb-4">{idea?.title || 'Title'}</h3>
            {idea?.description && (
              <p className="text-lg text-[#4a3a1a] mb-6">{idea.description}</p>
            )}
            <div className="flex space-x-6 text-[#4a3a1a] text-2xl">
              <i className="fas fa-heart cursor-pointer hover:text-red-500"></i>
              <i className="fa-solid fa-image cursor-pointer hover:text-blue-500"></i>
            </div>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-0 w-full pointer-events-none select-none opacity-50"
          alt=""
          src="/img/Vector 4.svg"
        />
      </div>
    </div>
  );
};

export default IdeaPage;
