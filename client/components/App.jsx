/* eslint-disable jsx-quotes */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage.jsx';
import CreationStation from './CreationStation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilteredPageHandler from './homepageChildren/FilteredPageHandler.jsx';
import Community from './Community.jsx';
import NavFilter from './homepageChildren/NavFilter.jsx';
import FriendProfile from './profileChildren/FriendProfile.jsx';
import BarHop from './BarHop.jsx';

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
        <Route path='/profile' element={<Profile />} />
        <Route path='/bar-hop' element={<BarHop />} />
        <Route path='/creationStation' element={<CreationStation />} />
        <Route path='/community' element={<Community />} />
        <Route path='/filtered/:filter/*' element={<FilteredPageHandler />} />
        <Route path='/profile/friend/:id' element={<FriendProfile />} />
      </Routes>
    </>
  );
}

export default App;
