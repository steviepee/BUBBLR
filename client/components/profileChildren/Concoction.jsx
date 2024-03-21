/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Concoction({
  drink, index, getIngredients, removeDrink,
}) {
  const { idDrink, strDrink, strCategory } = drink;
  const ingredients = getIngredients(drink).toString();
  return (
    <Accordion.Item key={`item-${idDrink}`} eventKey={index}>
      <Accordion.Header key={`header-${idDrink}`}>
        {strDrink}
        <Button size='sm' value={drink.idDrink}>
          Edit
        </Button>
        <Button size='sm' value={drink.idDrink} variant='danger' className='concoction' onClick={removeDrink}>
          Remove
        </Button>
      </Accordion.Header>
      <Accordion.Body key={`body-${idDrink}`}>
        <Card>
          <Card.Title>{strCategory}</Card.Title>
          <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text>
        </Card>
      </Accordion.Body>
    </Accordion.Item>
  );
}

Concoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  getIngredients: PropTypes.func.isRequired,
  removeDrink: PropTypes.func.isRequired,
};

export default Concoction;
