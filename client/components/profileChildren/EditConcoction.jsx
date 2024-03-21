import React from 'react';
import PropTypes from 'prop-types';

// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class EditConcoction extends React.Component {
  constructor({
    drink, handleClose, show, handleSubmit, setShow,
  }) {
    super({ show });

    this.drink = drink;

    // this.props.show = show;
    this.handleClose = handleClose;
    this.handleSubmit = handleSubmit;
    this.setShow = setShow;

    this.state = {
      // these states are accessed in profile
      // eslint-disable-next-line react/no-unused-state
      strDrink: this.drink.strDrink,
      // eslint-disable-next-line react/no-unused-state
      strCategory: this.drink.strCategory,
    };

    this.handleChange = (e) => {
      // console.log(e.target.value, e.target.className);
      switch (e.target.className.split(' ')[0]) {
        case 'name':
          // this state is being accessed from profile
          // eslint-disable-next-line react/no-unused-state
          this.setState({ strDrink: e.target.value });
          break;
        case 'category':
          // this state is being accessed from profile
          // eslint-disable-next-line react/no-unused-state
          this.setState({ strCategory: e.target.value });
          break;
        default:
          break;
      }
    };
  }

  render() {
    const { show } = this.props;
    const { strDrink, strCategory } = this.drink;
    return (
      <Modal show={show} onHide={() => this.handleClose(this.setShow)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Concoction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDrinkName">
              <Form.Label>Drink Name</Form.Label>
              <Form.Control type="drinkName" className="name" defaultValue={strDrink} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="drinkCategory" className="category" defaultValue={strCategory} onChange={this.handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose(this.setShow)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => this.handleSubmit(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditConcoction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  drink: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default EditConcoction;
