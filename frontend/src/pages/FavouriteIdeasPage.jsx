import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Idea from '../components/Idea';

const FavouriteIdeasPage = () => {
  const navigate = useNavigate();
  const [favouriteIdeas, setFavouriteIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/please-login');
      return;
    }

    const fetchFavouriteIdeas = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/favourites/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavouriteIdeas(data);
        } else {
          console.error('Failed to fetch favourite ideas');
        }
      } catch (error) {
        console.error('Error fetching favourite ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteIdeas();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container">
        <Navigation />
        <div className="base-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] flex flex-row">
      <div className="w-72">
        <Navigation />
      </div>
      <div className="flex-1 p-10 flex flex-col items-center">
        <img className="decoration-top" alt="" src="public/img/Vector 3.svg" />
        <div className="top-leyer w-full max-w-6xl">
          <div className="search-bar" style={{ visibility: 'hidden' }}>
            <input placeholder="search idea" />
          </div>
          <div className="section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {favouriteIdeas.length > 0 ? (
              favouriteIdeas.map(idea => (
                <Idea key={idea.id} idea={idea} />
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
