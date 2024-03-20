import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from  './Profile.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';


function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/profile">User Prof</Link>
          </li>
        </ul>
      </nav>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<h1>Dash</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
