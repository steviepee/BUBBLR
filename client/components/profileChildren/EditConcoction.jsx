import React from 'react';
import PropTypes from 'prop-types';

// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class EditConcoction extends React.Component {
  constructor({ drink, handleClose, show }) {
    super({ show });

    // this.state = {
    //   show,
    // };

    this.drink = drink;
    this.props.show = show;

    this.handleSubmit = (e) => {
      console.log(e);
      handleClose();
    };

    this.handleChange = (e) => {
      console.log(e.target.value, e.target.className);
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Concoction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDrinkName">
              <Form.Label>Drink Name</Form.Label>
              <Form.Control type="drinkName" className="drinkName" defaultValue={this.drink.strDrink} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="drinkCategory" defaultValue={this.drink.strCategory} onChange={this.handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// function EditConcoction({ drink, handleClose, show }) {
//   const handleSubmit = (e) => {
//     console.log(e);
//     handleClose();
//   };

//   const handleChange = (e) => {
//     console.log(e.target.value);
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Your Concoction</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3" controlId="formDrinkName">
//             <Form.Label>Drink Name</Form.Label>
//             <Form.Control type="drinkName" defaultValue={drink.strDrink} onChange={handleChange} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formDrinkCategory">
//             <Form.Label>Category</Form.Label>
//             <Form.Control type="drinkCategory" defaultValue={drink.strCategory} />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" type="submit" onClick={handleSubmit}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

EditConcoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EditConcoction;
