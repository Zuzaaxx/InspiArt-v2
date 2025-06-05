import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaUser } from 'react-icons/fa';

const MyProfilePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/please-login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.first_name,
            username: data.username,
            email: data.email,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen font-inter">
      <Navigation />
      <div className="flex-1 relative bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] p-10 overflow-hidden flex flex-col items-center shadow-inner shadow-[#c48a2f44]">
        <img
          className="absolute top-0 left-0 w-full pointer-events-none select-none z-10"
          alt=""
          src="/img/Vector 5.svg"
        />

        <div className="relative z-20 w-full max-w-xl mt-20 text-center">
          <div className="bg-white rounded-full p-6 mx-auto mb-8 shadow-md w-28 h-28 flex justify-center items-center">
            <FaUser className="text-orange-500 text-5xl" />
          </div>

          <h2 className="text-3xl font-bold text-[#4a3a1a] mb-6">My Profile</h2>

          {loading ? (
            <p className="text-lg text-gray-600">Loading...</p>
          ) : (
            <form className="w-full flex flex-col gap-6 text-left">
              <div>
                <label className="font-semibold text-[#4a3a1a] block mb-1">Name:</label>
                <div className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-90 shadow-md text-gray-800 text-base">
                  {userData.name || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="font-semibold text-[#4a3a1a] block mb-1">Username:</label>
                <div className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-90 shadow-md text-gray-800 text-base">
                  {userData.username || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="font-semibold text-[#4a3a1a] block mb-1">Email:</label>
                <div className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-90 shadow-md text-gray-800 text-base">
                  {userData.email || 'Not provided'}
                </div>
              </div>
            </form>
          )}
        </div>

        <img
          className="absolute bottom-0 right-0 w-full pointer-events-none select-none z-10"
          alt=""
          src="/src/assets/Vector 4.svg"
        />
        <img
          className="absolute bottom-8 right-8 w-44 pointer-events-none select-none z-10"
          alt="bird"
          src="/src/assets/logo-bird.png"
        />
      </div>
    </div>
  );
};

export default MyProfilePage;
