import React from 'react';
import PropTypes from 'prop-types';

// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class EditConcoction extends React.Component {
  constructor(props) {
    super(props);

    this.drink = props.drink;
    this.handleClose = props.handleClose;
    this.handleSubmit = props.handleSubmit;
    this.setShow = props.setShow;

    this.state = {
      // these states are all accessed from profile on submit
      // eslint-disable-next-line react/no-unused-state
      drinkName: this.drink.drinkName,
      // eslint-disable-next-line react/no-unused-state
      drinkIngredients: this.drink.drinkIngredients,
      // eslint-disable-next-line react/no-unused-state
      id: this.drink.id,
    };

    this.handleChange = (e) => {
      switch (e.target.className.split(' ')[0]) {
        case 'name':
          // these are being accessed by onSubmit in profile
          // eslint-disable-next-line react/no-unused-state
          this.setState({ drinkName: e.target.value });
          break;
        case 'ingredients':
          // eslint-disable-next-line react/no-unused-state
          this.setState({ drinkIngredients: JSON.stringify(e.target.value.split(', ')) });
          break;
        // will be refactored to match db soon
        // case 'category':
        //   // this state is being accessed from profile
        //   // eslint-disable-next-line react/no-unused-state
        //   this.setState({ strCategory: e.target.value });
        //   break;
        // case 'measures':
        //   this.setState({ measures: e.target.value });
        //   break;
        // case 'instructions':
        //   // eslint-disable-next-line react/no-unused-state
        //   this.setState({ strInstructions: e.target.value });
        //   break;
        // case 'glass':
        //   this.setState({ strGlass: e.target.value });
        //   break;
        default:
          break;
      }
    };
  }

  render() {
    const { show } = this.props;
    const { drinkName, drinkIngredients } = this.drink;
    return (
      <Modal show={show} onHide={() => this.handleClose(this.setShow)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Concoction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDrinkName">
              <Form.Label>Drink Name</Form.Label>
              <Form.Control type="drinkName" className="name" defaultValue={drinkName} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkCategory">
              <Form.Label>Category</Form.Label>
              {/* <Form.Control
                type="drinkCategory" className="category"
                defaultValue={strCategory} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkGlass">
              <Form.Label>Glass</Form.Label>
              {/* <Form.Control type='drinkGlass' className='glass'
                defaultValue={strGlass} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control type="drinkIngredients" className="ingredients" defaultValue={JSON.parse(drinkIngredients).join(', ')} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkMeasures">
              <Form.Label>Measurements</Form.Label>
              {/* <Form.Control type="drinkMeasures" className="measures"
                defaultValue={measures} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkInstructions">
              <Form.Label>Instructions</Form.Label>
              {/* <Form.Control type="drinkInstructions" className="instructions"
                defaultValue={strInstructions} onChange={this.handleChange}
              /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.handleClose(this.setShow)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => this.handleSubmit(this)}
          >
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
