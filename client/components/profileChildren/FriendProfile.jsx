import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FriendConcoction from './FriendConcoction';
import FriendFav from './FriendFav';

function FriendProfile() {
  const { id } = useParams();

  const [friend, setFriend] = useState({});

  const [concoctions, setConcoctions] = useState([]);

  // const [reviews, setReviews] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`/profile/${id}`)
      .then(({ data }) => {
        // this is causing an infinite loop
        setFriend(data);
        return axios.get('/profile/concoctions');
      })
      .then(({ data }) => setConcoctions(data))
      .then(() => axios.get('/profile/estDrinks'))
      .then(({ data }) => setFavorites(data))
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
          <Container>
            <Row>
              {concoctions.map((concoction) => (
                <FriendConcoction concoction={concoction} key={concoction.id} />
              ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Favorites</Card.Title>
          <Container>
            <Row>
              {favorites.map((favorite) => (
                <FriendFav key={`fav-${favorite.id}`} favorite={favorite} />
              ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Reviews</Card.Title>
          {/* {reviews.map(() => (
            <div>hello</div>
          ))} */}
        </Card.Body>
      </Card>
    </>
  );
}

export default FriendProfile;
