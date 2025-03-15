/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Card } from 'react-bootstrap';
import '../styling/Profile.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/leaderboard/top-scores')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLeaderboard(res.data);
        } else {
          console.error('leaderboard err', res.data);
          setLeaderboard([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('err fetching leaderboard', err);
        setError('err fetching leaderboard');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <div className='text-center'>
      <h1 className="leaderboard-title">Leaderboard</h1>
      </div>
      <Card className="custom-card mt-4 mb-4">
        <Card.Body className="custom-card-body" style={{ color: '#ffffff' }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={`${entry.userId}-${entry.id}`}>
                  <td>{index + 1}</td>
                  <td>
                    {entry.User && entry.User.nameFirst} {entry.User && entry.User.nameLast ? entry.User.nameLast : 'Unknown'}
                  </td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leaderboard;
