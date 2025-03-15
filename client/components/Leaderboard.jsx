/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/leaderboard/top-scores')
      .then((res) => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
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
      <h2>Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.userId}>
              <td>{index + 1}</td>
              <td>{entry.User.nameFirst} {entry.User.nameLast}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;
