import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaDice } from 'react-icons/fa';

const StartPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

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

    useEffect(() => {
        if (!token) {
            navigate('/please-login');
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return (
        <div className="w-screen h-screen flex flex-row font-sans bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5]">
            <div className="w-72">
                <Navigation />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-50" style={{ backgroundImage: "url('/src/assets/logo-bird.png')" }}></div>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 absolute place-items-center w-1/2 h-[70vh]">
                    <div className="w-3/5 h-50 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/idea/1')}>
                        <img src="/src/assets/description.svg" alt="description" className="mb-2 h-24" />
                        <p className="text-xl text-center">description</p>
                    </div>
                    <div className="w-3/5 h-50 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/idea/2')}>
                        <img src="/src/assets/simple-drawing.svg" alt="simple drawing" className="mb-2 h-24" />
                        <p className="text-xl text-center">simple drawing</p>
                    </div>
                    <div className="w-3/5 h-50 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={() => navigate('/idea/3')}>
                        <img src="/src/assets/scribble-art.svg" alt="scribble art" className="mb-2 h-24" />
                        <p className="text-xl text-center">scribble art</p>
                    </div>
                    <div className="w-3/5 h-50 bg-white/90 p-12 rounded-3xl flex flex-col items-center cursor-pointer" onClick={async () => {
                        try {
                            const response = await fetch('http://127.0.0.1:8000/api/random_idea/');
                            if (response.ok) {
                                const data = await response.json();
                                navigate(`/idea/${data.id}`, { state: { idea: data } });
                            } else {
                                console.error('Failed to fetch random idea');
                            }
                        } catch (error) {
                            console.error('Error fetching random idea:', error);
                        }
                    }}>
                        <FaDice className="mb-2 text-black text-8x1 w-24 h-24" />
                        <p className="text-xl text-center">random</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
