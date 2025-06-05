import React from 'react';

const Idea = ({ idea }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-60 h-80 cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {idea.image && (
        <img
          src={idea.image}
          alt={idea.title}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{idea.alternative_text || idea.title || 'Untitled'}</h3>
      {idea.picture && <p className="text-gray-700 text-sm">{idea.picture}</p>}
    </div>
  );
};

export default Idea;
