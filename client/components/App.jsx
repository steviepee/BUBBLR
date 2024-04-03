/* eslint-disable jsx-quotes */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage';
import CreationStation from './CreationStation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilteredPageHandler from './homepageChildren/FilteredPageHandler.jsx';
import Community from './Community.jsx';
import NavFilter from './homepageChildren/NavFilter.jsx';
import FriendProfile from './profileChildren/FriendProfile.jsx';

function App() {
  return (
    <>
      <nav>
        <NavFilter />
      </nav>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/*' element={<Homepage />} />
        <Route path='/estdrink/:id' element={<EstDrinkPage />} />
        <Route path='/dashboard' element={<h1>Dash</h1>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/creationStation' element={<CreationStation />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/community' element={<Community />} />
        <Route path='/filtered/:filter/*' element={<FilteredPageHandler />} />
        <Route path='/profile/friend/:id' element={<FriendProfile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
