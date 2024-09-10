/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/check-auth')
      .then(({ isAuthenticated }) => {
        if (isAuthenticated) {
          navigate('/');
        }
      })
      .catch((err) => console.error('Error checking auth', err));
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div>
      <h2> BUBBLR Login </h2>
      <button onClick={handleGoogleLogin}> Login with Google </button>
    </div>
  );
};

export default Login;
