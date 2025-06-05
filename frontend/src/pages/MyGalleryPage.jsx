import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Idea from '../components/Idea';

const MyGalleryPage = () => {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/please-login');
      return;
    }

    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user-gallery/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGalleryItems(data);
        } else {
          console.error('Failed to fetch user gallery items');
        }
      } catch (error) {
        console.error('Error fetching user gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
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
      <div className="flex-1 p-10 flex flex-col items-center justify-center">
        <img className="decoration-top" alt="" src="public/img/Vector 3.svg" />
        <div className="top-layer w-full max-w-6xl flex justify-center items-center">
          {galleryItems.length > 0 ? (
            <div className="section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
              {galleryItems.map(item => (
                <Idea key={item.id} idea={item} />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-[#4a3a1a] font-semibold text-center">
              you don't have any drawings here yet
            </p>
          )}
        </div>
        <img className="decoration-bottom" alt="" src="public/img/Vector 4.svg" />
      </div>
    </div>
  );
};

export default MyGalleryPage;
