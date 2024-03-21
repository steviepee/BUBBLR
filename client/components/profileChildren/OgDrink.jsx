import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const OgDrink = ({ drink, removeFavorite, getIngredients }) => {
  const ingredients = getIngredients(drink);
  return (
    <Col>
      <Card>
        <Card.Body>
          <Button
            size='sm'
            value={drink.idDrink}
            variant='danger'
            onClick={removeFavorite}
          >
            Remove
          </Button>
          <Card.Img variant='top' src={drink.strDrinkThumb} />
          <Accordion>
            <Accordion.Header>
              <Card.Title>{drink.strDrink}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Card.Title>{drink.strCategory}</Card.Title>
                  <Card.Text>{drink.strTags}</Card.Text>
                  <Card.Text>Ingredients: {ingredients.toString()}</Card.Text>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OgDrink;
