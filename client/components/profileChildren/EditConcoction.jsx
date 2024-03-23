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
    // this.ingredients = props.ingredients;
    // this.measures = props.measures;

    // this.props.show = show;
    this.handleClose = props.handleClose;
    this.handleSubmit = props.handleSubmit;
    this.setShow = props.setShow;

    // this.state = {
    //   // these states are accessed in profile
    //   // eslint-disable-next-line react/no-unused-state
    //   strDrink: this.drink.strDrink,
    //   // eslint-disable-next-line react/no-unused-state
    //   strCategory: this.drink.strCategory,
    //   strGlass: 'Pint Glass',
    //   ingredients: this.ingredients,
    //   measures: this.measures,
    //   // eslint-disable-next-line react/no-unused-state
    //   strInstructions: this.drink.strInstructions,
    // };

    this.state = {
      drinkName: this.drink.drinkName,
      drinkIngredients: this.drink.drinkIngredients,
    };

    this.handleChange = (e) => {
      switch (e.target.className.split(' ')[0]) {
        case 'name':
          this.setState({ drinkName: e.target.value });
          break;
        case 'ingredients':
          this.setState({ drinkIngredients: JSON.stringify(e.target.value.split(', ')) });
          break;
        default:
          break;
      }
    };

    // this.handleChange = (e) => {
    //   // console.log(e.target.value, e.target.className);
    //   switch (e.target.className.split(' ')[0]) {
    //     case 'name':
    //       // this state is being accessed from profile
    //       // eslint-disable-next-line react/no-unused-state
    //       this.setState({ strDrink: e.target.value });
    //       break;
    //     case 'category':
    //       // this state is being accessed from profile
    //       // eslint-disable-next-line react/no-unused-state
    //       this.setState({ strCategory: e.target.value });
    //       break;
    //     case 'ingredients':
    //       this.setState({ ingredients: e.target.value });
    //       break;
    //     case 'measures':
    //       this.setState({ measures: e.target.value });
    //       break;
    //     case 'instructions':
    //       // eslint-disable-next-line react/no-unused-state
    //       this.setState({ strInstructions: e.target.value });
    //       break;
    //     case 'glass':
    //       this.setState({ strGlass: e.target.value });
    //       break;
    //     default:
    //       break;
    //   }
    // };
  }

  render() {
    const { show } = this.props;
    // const { strDrink, strCategory, strInstructions } = this.drink;
    const { drinkName, drinkIngredients } = this.drink;
    // const { ingredients, measures, strGlass } = this.state;
    return (
      <Modal show={show} onHide={() => this.handleClose(this.setShow)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Concoction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDrinkName">
              <Form.Label>Drink Name</Form.Label>
              <Form.Control type='drinkName' className='name' defaultValue={drinkName} onChange={this.handleChange} />
              {/* <Form.Control
                type="drinkName" className="name"
                defaultValue={strDrink} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkCategory">
              <Form.Label>Category</Form.Label>
              {/* <Form.Control
                type="drinkCategory" className="category"
                defaultValue={strCategory} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className='mb-3' controlId="formDrinkGlass">
              <Form.Label>Glass</Form.Label>
              {/* <Form.Control type='drinkGlass' className='glass'
                defaultValue={strGlass} onChange={this.handleChange}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDrinkIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control type='drinkIngredients' className='ingredients' defaultValue={JSON.parse(drinkIngredients).join(', ')} onChange={this.handleChange} />
              {/* <Form.Control type="drinkIngredients" className="ingredients"
                defaultValue={ingredients} onChange={this.handleChange}
              /> */}
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
            variant='secondary'
            onClick={() => this.handleClose(this.setShow)}
          >
            Close
          </Button>
          <Button
            variant='primary'
            type='submit'
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
  // ingredients: PropTypes.string.isRequired,
};

export default EditConcoction;
