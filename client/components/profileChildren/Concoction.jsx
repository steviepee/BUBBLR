import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const Concoction = ({drink, index, getIngredients}) => {
  const { idDrink, strDrink, strCategory } = drink;
  console.log(getIngredients(drink));
  return (
    <Accordion.Item key={`item-${idDrink}`} eventKey={index}>
      <Accordion.Header key={`header-${idDrink}`}>{strDrink}</Accordion.Header>
      <Accordion.Body key={`body-${idDrink}`}>
        <Card>
          <Card.Title>{strCategory}</Card.Title>
        </Card>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Concoction;