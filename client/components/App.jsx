import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from  './Profile.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx'
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilteredPage from './homepageChildren/FilteredPage.jsx';
import FilteredPageHandler from './homepageChildren/FilteredPageHandler.jsx';
import Community from './Community.jsx';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/profile">User Prof</Link>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </nav>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={<Homepage />} />
          <Route path="/estdrink/:id" element={<EstDrinkPage />} />
          <Route path="/dashboard" element={<h1>Dash</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/community' element={ <Community />} />
          <Route path='/filtered/:filter/*' element={ <FilteredPageHandler />} /> 
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
