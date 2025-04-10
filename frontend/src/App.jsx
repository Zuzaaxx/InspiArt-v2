import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';

const App = () => {
  return (
    <div>
      <UsersList />
    </div>
  )
}

export default App
