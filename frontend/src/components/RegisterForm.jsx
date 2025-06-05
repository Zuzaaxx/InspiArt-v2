import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmedPassword: '',
    email: '',
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage('');

    const errors = [];
    if (!formData.name) errors.push('Name is required.');
    if (!formData.username) errors.push('Username is required.');
    if (!formData.password) errors.push('Password is required.');
    if (formData.password !== formData.confirmedPassword) errors.push('Passwords do not match.');
    if (!formData.email) errors.push('Email is required.');

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    setSuccessMessage('New user has been added successfully!');
    setFormData({
      name: '',
      username: '',
      password: '',
      confirmedPassword: '',
      email: '',
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-3xl font-semibold text-orange-600">InspiArt</span>
        <span role="img" aria-label="feather" className="text-2xl">🪶</span>
      </div>

      <p className="text-2xl font-bold mb-3">Join us!</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {errorMessages.length > 0 && (
            <ul className="text-red-600 mb-2 list-disc list-inside">
              {errorMessages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
        </div>

        <label htmlFor="name" className="block mb-1 font-semibold">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <label htmlFor="username" className="block mb-1 font-semibold">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <label htmlFor="password" className="block mb-1 font-semibold">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <label htmlFor="confirmedPassword" className="block mb-1 font-semibold">Confirmed password:</label>
        <input
          id="confirmedPassword"
          name="confirmedPassword"
          type="password"
          value={formData.confirmedPassword}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <label htmlFor="email" className="block mb-1 font-semibold">E-mail:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full transition-colors duration-300"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
