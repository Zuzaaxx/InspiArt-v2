import React, { useState, useEffect } from 'react';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  // Simulate fetching current user data on mount
  useEffect(() => {
    // TODO: Replace with actual API call or auth context
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
    // TODO: Implement save logic (API call)
    console.log('Saving user data:', userData);
    // For demo, save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    alert('User data saved successfully!');
  };

  return (
    <div className="container">
      <nav>
        <div className="inspiart">
          <span className="inspiart-text">InspiArt</span>
          <span role="img" aria-label="feather">🪶</span>
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="start" className="menu-button">
                <i className="fa-solid fa-house"></i>
                <p className="menu-button-text">Start</p>
              </a>
            </li>
            <li>
              <a href="favourites" className="menu-button">
                <i className="fa-solid fa-heart"></i>
                <p className="menu-button-text">Favourite ideas</p>
              </a>
            </li>
            <li>
              <a href="gallery" className="menu-button" style={{ color: '#d46900' }}>
                <i className="fa-solid fa-image"></i>
                <p className="menu-button-text">My gallery</p>
              </a>
            </li>
            <li>
              <a href="profile" className="menu-button">
                <i className="fa-solid fa-user"></i>
                <p className="menu-button-text">My profile</p>
              </a>
            </li>
          </ul>
        </div>
        <button className="log-out" onClick={() => window.location.href='login'}>Log out</button>
      </nav>
      <div className="base-container">
        <img className="decoration-top" alt="" src="public/img/Vector 5.svg" />
        <div className="section">
          <img className="profile-picture" src="public/img/profile-picture.svg" alt="profile" />
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
      </div>
    </div>
  );
};

export default MyProfile;
