/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function Concoction({
  drink, getIngredients, removeDrink,
}) {
  const { idDrink, strDrink, strCategory } = drink;
  const ingredients = getIngredients(drink).toString();
  return (
    <Col>
      <Card>
        <Button size='sm' value={drink.idDrink}>
          Edit
        </Button>
        <Button size='sm' value={drink.idDrink} variant='danger' className='concoction' onClick={removeDrink}>
          Remove
        </Button>
        <Card.Title>{strDrink}</Card.Title>
        <Card.Body key={`body-${idDrink}`}>
          <Card>
            <Card.Text>{strCategory}</Card.Text>
            <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text>
          </Card>
        </Card.Body>
      </Card>
    </Col>
  );
}

Concoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  getIngredients: PropTypes.func.isRequired,
  removeDrink: PropTypes.func.isRequired,
};

export default Concoction;
