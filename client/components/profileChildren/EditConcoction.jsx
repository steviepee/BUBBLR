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
      strDrink: this.drink.strDrink,
      strCategory: this.drink.strCategory,
    };

    // // this function will need to make an axios request to update db
    // this.handleSubmit = (scope) => {
    //   console.log('scope', scope);
    //   const { strDrink, strCategory } = scope.state;
    //   console.log(strDrink, strCategory);
    //   handleClose();
    // };

    this.handleChange = (e) => {
      // console.log(e.target.value, e.target.className);
      switch (e.target.className.split(' ')[0]) {
        case 'name':
          this.setState({ strDrink: e.target.value });
          break;
        case 'category':
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
};

export default EditConcoction;
