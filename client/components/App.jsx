import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Profile from  './Profile.jsx'
import Login from './Login.jsx';
import NotFound from './NotFound.jsx'
import CreationStation from './CreationStation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import Community from './Community.jsx';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/profile">User Prof</Link></li>
        <li><Link to="/creationStation">Creation Station</Link></li>
        

      </ul>
    </nav>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<h1>Dash</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/creationStation" element={<CreationStation />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/community' element={ <Community />} />
      </Routes>
  </>
  );
}

export default App;
