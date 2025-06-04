import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const payload = {
                username: formData.username,
                password: formData.password
            };
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            onLoginSuccess(data);
            localStorage.setItem('authToken', data.key);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg">
            <div className="flex items-center space-x-2 mb-8">
                <span className="text-3xl font-semibold text-orange-600">InspiArt</span>
                <span role="img" aria-label="feather" className="text-2xl">🪶</span>
            </div>

            <div className="mb-6">
                <p className="text-lg font-medium mb-4">Log in to see your inspirations</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {error && <div className="text-red-600 mb-2">{error}</div>}
                    </div>

                    <label htmlFor="username" className="block mb-1 font-semibold">Username:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${error ? 'border border-red-600' : 'border border-transparent'}`}
                    />

                    <label htmlFor="password" className="block mt-4 mb-1 font-semibold">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${error ? 'border border-red-600' : 'border border-transparent'}`}
                    />

                    <button
                        type="submit"
                        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full transition-colors duration-300"
                    >
                        Log in
                    </button>
                </form>
            </div>

            <div className="flex justify-center space-x-1 text-sm">
                <p className="text-gray-700">Forgot password?</p>
                <p
                    className="text-orange-500 cursor-pointer hover:underline"
                    onClick={() => window.location.href = '/forgot-password'}
                >
                    Click here
                </p>
            </div>
        </div>
    );

};

export default LoginForm;
