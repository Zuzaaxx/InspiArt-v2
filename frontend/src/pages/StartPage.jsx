import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaDice } from 'react-icons/fa';
// Removed unused CSS import
// import './StartPage.css';

const StartPage = ({ token }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    setUsername('');
                }
            } catch (error) {
                setUsername('');
            }
        };
        if (token) {
            fetchProfile();
        }
    }, [token]);

    if (!token) {
        return <p>Please login first.</p>;
    }

    return (
        <div className="w-screen h-screen flex flex-row font-sans bg-gradient-to-b from-white to-yellow-200">
            <div className="w-72">
                <Navigation />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-50" style={{ backgroundImage: "url('/src/assets/logo-bird.png')" }}></div>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 absolute place-items-center w-1/2 h-[70vh]">
                    <div className="w-3/5 h-36 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/description')}>
                        <img src="/src/assets/description.svg" alt="description" className="mb-2 h-24" />
                        <p className="text-xl text-center">description</p>
                    </div>
                    <div className="w-3/5 h-36 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/simple-drawing')}>
                        <img src="/src/assets/simple-drawing.svg" alt="simple drawing" className="mb-2 h-24" />
                        <p className="text-xl text-center">simple drawing</p>
                    </div>
                    <div className="w-3/5 h-36 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/scribble-art')}>
                        <img src="/src/assets/scribble-art.svg" alt="scribble art" className="mb-2 h-24" />
                        <p className="text-xl text-center">scribble art</p>
                    </div>
                    <div className="w-3/5 h-36 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/random')}>
                        <FaDice className="mb-2 text-black text-6xl" />
                        <p className="text-xl text-center">random</p>
                    </div>
                </div>
                <img className="flex w-full mt-auto mb-auto" alt="" src="/src/assets/Vector 4.svg" />
            </div>
        </div>
    );
};

export default StartPage;
