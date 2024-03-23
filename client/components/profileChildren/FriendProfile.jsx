import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Card from 'react-bootstrap/Card';

function FriendProfile() {
  const { id } = useParams();

  const [friend, setFriend] = useState({});

  useEffect(() => {
    axios.get(`/profile/${id}`)
      .then(({ data }) => {
        // this is causing an infinite loop
        setFriend(data);

        // console.log(data);
      })
      .catch((err) => console.error('failed getting friend profile: ', err));
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{friend.displayName}</Card.Title>
          <Card.Text>{`Joined on: ${friend.createdAt}`}</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Concoctions</Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Favorites</Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Reviews</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default FriendProfile;
