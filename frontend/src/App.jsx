import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetails';

const App = () => {
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
          </Routes>
      </Router>
  );
}

export default App
