import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from  './Profile.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx'
<<<<<<< HEAD
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage.jsx';
=======
import CreationStation from './CreationStation.jsx';
>>>>>>> f986673eef8e67a3e058a59901e2885a7fa91967
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
<<<<<<< HEAD
            <Link to="/home">Home</Link>
=======
            <Link to="/creationStation">Creation Station</Link>
>>>>>>> f986673eef8e67a3e058a59901e2885a7fa91967
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
<<<<<<< HEAD
=======
          <Route path="/creationStation" element={<CreationStation />} />
          <Route path="*" element={<NotFound />} />
>>>>>>> f986673eef8e67a3e058a59901e2885a7fa91967
          <Route path='/community' element={ <Community />} />
          <Route path='/filtered/:filter/*' element={ <FilteredPageHandler />} /> 
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
