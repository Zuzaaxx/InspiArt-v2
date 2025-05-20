import React, { useEffect, useState } from 'react';

const StartPage = ({ token }) => {
    const [username, setUsername] = useState('');

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
        <div>
            <h1>Welcome, {username}!</h1>
        </div>
    );
};

export default StartPage;
