/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import '../styling/Login.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/check-auth')
      .then(({ isAuthenticated }) => {
        if (isAuthenticated) {
          navigate('/home');
        }
      })
      .catch((err) => console.error('Error checking auth', err));
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Container className='login-container d-flex justify-content-center align-items-center min-vh-100'>
      <Row className='justify-content-center w-100'>
        <Col md={8} lg={6} xl={4}>
          <Card className='shadow-lg rounded'>
            <Card.Body>
              <Card.Title className='login-title text-center mb-4'>BUBBLR Login</Card.Title>
              <Form>
                <Button variant='primary' onClick={handleGoogleLogin} className='w-100'>
                  Login with Google
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
