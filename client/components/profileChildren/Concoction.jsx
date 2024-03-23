/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import EditConcoction from './EditConcoction';

function Concoction({
  drink,
  removeDrink,
  handleClose,
  handleShow,
  handleSubmit,
}) {
  const { drinkName, drinkIngredients, id } = drink;

  const [show, setShow] = useState(false);

  return (
    <Col>
      <Card>
        <Button onClick={() => handleShow(setShow)} size='sm' value={id}>
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
          value={id}
          variant='danger'
          className='concoction'
          onClick={removeDrink}
        >
          Remove
        </Button>
        <Card.Title>{drinkName}</Card.Title>
        <Card.Body key={`body-${id}`}>
          <Card>
            {/* <Card.Text>{strCategory}</Card.Text> */}
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
  removeDrink: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Concoction;
