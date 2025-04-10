import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <div>
      <UserForm onUserAdded={(newUser) => console.log('Dodano użytkownika:', newUser)} />
      <UsersList />
    </div>
  )
}

export default App
