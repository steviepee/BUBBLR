import React, { useState, useEffect } from 'react';
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage.jsx';
import CreationStation from './CreationStation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilteredPageHandler from './homepageChildren/FilteredPageHandler.jsx';
import Community from './Community.jsx';
import NavFilter from './homepageChildren/NavFilter.jsx';
import FriendProfile from './profileChildren/FriendProfile.jsx';
import BarHop from './BarHop.jsx';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/check-auth');
        setIsAuth(response.data.isAuthenticated);

        if (response.data.isAuthenticated) {
          const profileResponse = await axios.get('/auth/me');
          setUserProfile(profileResponse.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setIsAuth(false);
        throw new Error('Error checking auth', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading... Please wait</div>;
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setIsAuth(false);
      setUserProfile(null);
      navigate('/');
    } catch (error) {
      throw new Error('Error during logout:', error);
    }
  };

  return (
    <>
      {isAuth && <NavFilter onLogout={handleLogout}/>}
      <Routes>
        <Route path='/' element={!isAuth ? <Login /> : <Navigate to='/home' replace />} />
        <Route path='/home' element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path='/estdrink/:id' element={<ProtectedRoute><EstDrinkPage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/bar-hop' element={<ProtectedRoute><BarHop /></ProtectedRoute>} />
        <Route path='/creationStation' element={<ProtectedRoute><CreationStation /></ProtectedRoute>} />
        <Route path='/community' element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path='/filtered/:filter/*' element={<ProtectedRoute><FilteredPageHandler /></ProtectedRoute>} />
        <Route path='/profile/friend/:id' element={<ProtectedRoute><FriendProfile /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
