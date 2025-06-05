import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import './MyProfilePage.css';
import { FaUser } from 'react-icons/fa';

const MyProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser')) || {
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: '',
    };
    setUserData(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    alert('User data saved successfully!');
  };

  return (
    <div className="container">
      <Navigation />
      <div className="base-container">
        <img className="decoration-top" alt="" src="public/img/Vector 5.svg" />
        <div className="section">
          <FaUser />
          <form>
            <p className="input-label">Name:</p>
            <input
              name="name"
              type="text"
              placeholder="name"
              value={userData.name}
              onChange={handleChange}
            />
            <p className="input-label">E-mail:</p>
            <input
              name="email"
              type="text"
              placeholder="email@gmail.com"
              value={userData.email}
              onChange={handleChange}
            />
            <p className="input-label">Username:</p>
            <input
              name="username"
              type="text"
              placeholder="username"
              value={userData.username}
              onChange={handleChange}
            />
            <p className="input-label">Password:</p>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={userData.password}
              onChange={handleChange}
            />
          </form>
          <button className="save" onClick={handleSave}>Save changes</button>
        </div>
        <img className="decoration-bottom" alt="" src="public/img/Vector 4.svg" />
        <img className="bird-illustration" alt="bird" src="public/img/logo-bird.png" />
      </div>
    </div>
  );
};

export default MyProfilePage;
