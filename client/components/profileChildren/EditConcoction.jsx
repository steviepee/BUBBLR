import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

function EditConcoction({ drink, handleClose, show }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{drink.strDrink}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}

EditConcoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EditConcoction;
