import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function OgDrink({ drink, removeDrink, getIngredients }) {
  const ingredients = getIngredients(drink).toString();
  return (
    <Col>
      <Card>
        <Card.Body>
          <Button
            size='sm'
            value={drink.idDrink}
            variant='danger'
            onClick={removeDrink}
            className='ogDrink'
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
                  <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text>
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
