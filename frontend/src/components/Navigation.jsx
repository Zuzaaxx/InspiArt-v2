import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaImage, FaUser } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <nav className="navigation-container">
            <div className="inspiart">
                <span className="inspiart-text">InspiArt</span>
                <span role="img" aria-label="feather">🪶</span>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to="/start" className={({ isActive }) => isActive ? 'menu-button active' : 'menu-button'}>
                            <FaHome />
                            <p className="menu-button-text">Start</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourites" className={({ isActive }) => isActive ? 'menu-button active' : 'menu-button'}>
                            <FaHeart />
                            <p className="menu-button-text">Favourite ideas</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery" className={({ isActive }) => isActive ? 'menu-button active' : 'menu-button'}>
                            <FaImage />
                            <p className="menu-button-text">My gallery</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? 'menu-button active' : 'menu-button'}>
                            <FaUser />
                            <p className="menu-button-text">My profile</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <button className="log-out" onClick={handleLogout}>Log out</button>
        </nav>
    );
};

export default Navigation;
