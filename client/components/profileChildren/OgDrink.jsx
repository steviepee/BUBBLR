/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function OgDrink({ drink, removeDrink }) {
  console.log('drink ingredients array', drink.drinkIngredients); // <-- Logs an array of objects,
  // this component needs to be updated to render these properly now that the database actually utilizes estDrinks.
  const {
    drinkId, drinkImage, drinkName, drinkCategory, drinkIngredients,
  } = drink;
  return (
    <Col>
      <Card>
        <Card.Body>
          <Link to={`/estDrink/${drinkId}`}>
            <Button
              size='sm'
            >
              Go To
            </Button>
          </Link>
          <Button
            size='sm'
            value={drinkId}
            variant='danger'
            onClick={removeDrink}
            className='ogDrink'
          >
            Remove
          </Button>
          <Card.Img variant='top' src={drinkImage} />
          <Accordion>
            <Accordion.Header>
              <Card.Title>{drinkName}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Card.Title>{drinkCategory}</Card.Title>
                  <Card.Text>Ingredients: </Card.Text>
                  {/* UPDATE HERE */}
                  {drinkIngredients.map((item) => (
                    <Card.Text key={`${drinkId}-${item.ingredient}`}>{`${item.ingredient}: ${item.measurement}`}</Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
}

OgDrink.propTypes = {
  drink: PropTypes.shape({
    drinkId: PropTypes.number.isRequired,
    drinkImage: PropTypes.string.isRequired,
    drinkName: PropTypes.string.isRequired,
    drinkCategory: PropTypes.string.isRequired,
    drinkIngredients: PropTypes.arrayOf(PropTypes.shape({
      ingredient: PropTypes.string.isRequired,
      measurement: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  removeDrink: PropTypes.func.isRequired,
};

export default OgDrink;
