import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetails';
import LoginPage from './components/LoginPage';
import JoinPage from './components/JoinPage';
import StartPage from './components/StartPage';
import IdeaView from './components/IdeaView';
import FavouriteIdeas from './components/FavouriteIdeas';
import MyGallery from './components/MyGallery';
import MyProfile from './components/MyProfile';

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
              <Route path="/favourites" element={<FavouriteIdeas />} />
              <Route path="/gallery" element={<MyGallery />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/description" element={<IdeaView />} />
              <Route path="/simple-drawing" element={<IdeaView />} />
              <Route path="/scribble-art" element={<IdeaView />} />
              <Route path="/random" element={<IdeaView />} />
              <Route path="/" element={<Navigate to={token ? "/start" : "/login"} replace />} />
              <Route path="*" element={<Navigate to={token ? "/start" : "/login"} replace />} />
          </Routes>
      </Router>
  );
}

export default App
