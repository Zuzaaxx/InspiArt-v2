import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetails';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import StartPage from './pages/StartPage';
import IdeaPage from './pages/IdeaPage';
import FavouriteIdeasPage from './pages/FavouriteIdeasPage';
import MyGalleryPage from './pages/MyGalleryPage';
import MyProfilePage from './pages/MyProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PleaseLoginPage from './pages/PleaseLoginPage';
import AdvancedPage from './pages/AdvancedPage';
import './index.css';

const App = () => {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/users-list" element={
          <div>
            <UsersList />
          </div>
        } />
        <Route path="/users-list/:id" element={<UserDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/start" element={<StartPage token={token} />} />
        <Route path="/favourites" element={<FavouriteIdeasPage />} />
        <Route path="/gallery" element={<MyGalleryPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/description" element={<IdeaPage />} />
        <Route path="/simple-drawing" element={<IdeaPage />} />
        <Route path="/scribble-art" element={<IdeaPage />} />
        <Route path="/random" element={<IdeaPage />} />
        <Route path="/idea/:id" element={<IdeaPage />} />
        <Route path="/please-login" element={<PleaseLoginPage />} />
        <Route path="/advanced" element={<AdvancedPage />} />
        <Route path="/" element={<Navigate to={token ? "/start" : "/login"} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
