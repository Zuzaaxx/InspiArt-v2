import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FaDice } from 'react-icons/fa';
import './StartPage.css';

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
        <div className="container">
            <Navigation />
            <div className="base-container">
                <img className="decoration-top" alt="" src="/src/assets/Vector 3.svg" />
                <div className="section">
                    <div className="option" onClick={() => navigate('/description')} style={{ cursor: 'pointer' }}>
                        <img src="/src/assets/description.svg" alt="description" />
                        <p className="option-label">description</p>
                    </div>
                    <div className="option" onClick={() => navigate('/simple-drawing')} style={{ cursor: 'pointer' }}>
                        <img src="/src/assets/simple-drawing.svg" alt="simple drawing" />
                        <p className="option-label">simple drawing</p>
                    </div>
                    <div className="option" onClick={() => navigate('/scribble-art')} style={{ cursor: 'pointer' }}>
                        <img src="/src/assets/scribble-art.svg" alt="scribble art" />
                        <p className="option-label">scribble art</p>
                    </div>
                    <div className="option" onClick={() => navigate('/random')} style={{ cursor: 'pointer' }}>
                        <FaDice />
                        <p className="option-label">random</p>
                    </div>
                </div>
                <img className="decoration-bottom" alt="" src="/src/assets/Vector 4.svg" />
            </div>
        </div>
    );
};

export default StartPage;
