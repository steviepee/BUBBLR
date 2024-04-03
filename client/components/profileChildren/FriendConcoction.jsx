import React from 'react';

import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function FriendConcoction({ concoction }) {
  const { drinkName, drinkIngredients } = concoction;
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{drinkName}</Card.Title>
          <Card.Text>{`Ingredients: ${JSON.parse(drinkIngredients).join(', ')}`}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

FriendConcoction.propTypes = {
  concoction: PropTypes.shape({
    drinkName: PropTypes.string.isRequired,
    drinkIngredients: PropTypes.string.isRequired,
  }).isRequired,
};

export default FriendConcoction;
