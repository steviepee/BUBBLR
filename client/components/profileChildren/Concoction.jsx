/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import EditConcoction from './EditConcoction';

function Concoction({
  drink,
  // getIngredients,
  // getMeasures,
  removeDrink,
  handleClose,
  handleShow,
  handleSubmit,
}) {
  // const { idDrink, strDrink, strCategory } = drink;
  // const ingredients = getIngredients(drink).toString();
  // const measures = getMeasures(drink).toString();
  const { drinkName, drinkIngredients, id } = drink;
  // console.log(JSON.parse(drinkIngredients).join(', '));

  const [show, setShow] = useState(false);

  return (
    <Col>
      <Card>
        {/* <Button onClick={() => handleShow(setShow)} size='sm' value={drink.idDrink}> */}
        <Button onClick={() => handleShow(setShow)} size='sm' value={id}>
          Edit
        </Button>
        <EditConcoction
          drink={drink}
          handleClose={handleClose}
          show={show}
          setShow={setShow}
          handleSubmit={handleSubmit}
          // ingredients={ingredients}
          // measures={measures}
        />
        <Button
          size='sm'
          // value={drink.idDrink}
          value={id}
          variant='danger'
          className='concoction'
          onClick={removeDrink}
        >
          Remove
        </Button>
        {/* <Card.Title>{strDrink}</Card.Title> */}
        <Card.Title>{drinkName}</Card.Title>
        {/* <Card.Body key={`body-${idDrink}`}> */}
        <Card.Body key={`body-${id}`}>
          <Card>
            {/* <Card.Text>{strCategory}</Card.Text> */}
            {/* <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text> */}
            <Card.Text>{`Ingredients: ${JSON.parse(drinkIngredients).join(', ')}`}</Card.Text>
          </Card>
        </Card.Body>
      </Card>
    </Col>
  );
}

Concoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  // getIngredients: PropTypes.func.isRequired,
  // getMeasures: PropTypes.func.isRequired,
  removeDrink: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Concoction;
