/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import EditConcoction from './EditConcoction';

function Concoction({
  drink,
  getIngredients,
  removeDrink,
  handleClose,
  handleShow,
  // show,
  handleSubmit,
}) {
  const { idDrink, strDrink, strCategory } = drink;
  const ingredients = getIngredients(drink).toString();

  const [show, setShow] = useState(false);

  return (
    <Col>
      <Card>
        <Button onClick={() => handleShow(setShow)} size='sm' value={drink.idDrink}>
          Edit
        </Button>
        <EditConcoction
          drink={drink}
          handleClose={handleClose}
          show={show}
          setShow={setShow}
          handleSubmit={handleSubmit}
        />
        <Button
          size='sm'
          value={drink.idDrink}
          variant='danger'
          className='concoction'
          onClick={removeDrink}
        >
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
  handleClose: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // show: PropTypes.bool.isRequired,
};

export default Concoction;
