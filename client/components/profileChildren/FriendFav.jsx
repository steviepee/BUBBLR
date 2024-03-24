import React from 'react';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function FriendFav({ favorite }) {
  const { drinkImage, drinkName, drinkId } = favorite;
  return (
    <Col>
      <Card>
        <Link to={`/estDrink/${drinkId}`}>
          <Button>Go to</Button>
        </Link>
        <Card.Img variant='top' src={drinkImage} />
        <Card.Body>
          <Card.Title>{drinkName}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FriendFav;
