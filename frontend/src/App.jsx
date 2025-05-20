import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetails';
import LoginPage from './components/LoginPage';
import JoinPage from './components/JoinPage';
import StartPage from './components/StartPage';

const App = () => {
    const token = localStorage.getItem('authToken');

    return (
      <Router>
          <Routes>
              <Route path="/users-list" element={
                <div>
                  <UserForm onUserAdded={(newUser) => console.log('Dodano użytkownika:', newUser)} />
                  <UsersList />
              </div>
              } />
              <Route path="/users-list/:id" element={<UserDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/start" element={<StartPage token={token} />} />
              <Route path="/" element={<Navigate to={token ? "/start" : "/login"} replace />} />
              <Route path="*" element={<Navigate to={token ? "/start" : "/login"} replace />} />
          </Routes>
      </Router>
  );
}

export default App
