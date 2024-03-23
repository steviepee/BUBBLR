import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function FriendConcoction({ concoction }) {
  const { drinkName, drinkIngredients } = concoction;
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{concoction.drinkName}</Card.Title>
          <Card.Text>{`Ingredients: ${JSON.parse(drinkIngredients).join(', ')}`}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FriendConcoction;
