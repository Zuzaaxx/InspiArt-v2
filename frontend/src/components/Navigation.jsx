import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaHeart, FaImage, FaUser } from 'react-icons/fa';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <nav className="w-[300px] h-screen bg-white flex flex-col items-center px-12 font-inter box-border">
            <div className="pt-[20%] text-2xl self-start">
                <span className="bg-gradient-to-r from-orange-500 to-black bg-clip-text text-transparent">InspiArt</span>
                <span role="img" aria-label="feather">🪶</span>
            </div>

            <div className="flex flex-col justify-center text-left w-full h-[40vh] mt-8">
                <ul className="list-none text-black text-sm tracking-widest w-full">
                    <li>
                        <NavLink
                            to="/start"
                            className={({ isActive }) =>
                                `flex items-center border-b border-[#854E25] pl-0 py-4 w-[90%] no-underline ${
                                    isActive ? 'text-orange-500 font-bold' : 'text-black'
                                }`
                            }
                        >
                            <FaHome />
                            <p className="ml-8 m-0">Start</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favourites"
                            className={({ isActive }) =>
                                `flex items-center border-b border-[#854E25] pl-0 py-4 w-[90%] no-underline ${
                                    isActive ? 'text-orange-500 font-bold' : 'text-black'
                                }`
                            }
                        >
                            <FaHeart />
                            <p className="ml-8 m-0">Favourite ideas</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/gallery"
                            className={({ isActive }) =>
                                `flex items-center border-b border-[#854E25] pl-0 py-4 w-[90%] no-underline ${
                                    isActive ? 'text-orange-500 font-bold' : 'text-black'
                                }`
                            }
                        >
                            <FaImage />
                            <p className="ml-8 m-0">My gallery</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center border-b border-[#854E25] pl-0 py-4 w-[90%] no-underline ${
                                    isActive ? 'text-orange-500 font-bold' : 'text-black'
                                }`
                            }
                        >
                            <FaUser />
                            <p className="ml-8 m-0">My profile</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <button
                className="mt-auto rounded-full bg-orange-500 w-full h-16 border-none text-white my-12 tracking-widest font-bold text-sm hover:bg-[#854E25] transition-colors duration-300"
                onClick={handleLogout}
            >
                Log out
            </button>
        </nav>
    );
};

export default Navigation;
