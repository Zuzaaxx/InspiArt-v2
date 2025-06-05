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
    <div className="register-form">
      <p className="log-in-to">Join us!</p>
      <form className="register" onSubmit={handleSubmit} style={{ height: '80vh' }}>
        <div className="message">
          {errorMessages.length > 0 && (
            <ul>
              {errorMessages.map((msg, idx) => (
                <li key={idx} style={{ color: 'red' }}>{msg}</li>
              ))}
            </ul>
          )}
          {successMessage && (
            <p style={{ color: 'green' }}>{successMessage}</p>
          )}
        </div>

        <p>Name:</p>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <p>Username:</p>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />

        <p>Password:</p>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <p>Confirmed password:</p>
        <input
          name="confirmedPassword"
          type="password"
          value={formData.confirmedPassword}
          onChange={handleChange}
        />

        <p>E-mail:</p>
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterForm;
