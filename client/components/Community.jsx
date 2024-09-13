import React from 'react';
import axios from 'axios';
import DrinkEntry from './communityChildren/DrinkEntry';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Community extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      loading: true,
      error: null,
      selectedLetter: 'A',
    };
  }

  componentDidMount() {
    this.fetchDrinks(this.state.selectedLetter);
  }

  fetchDrinks = (letter) => {
    this.setState({ loading: true, error: null });
    axios.get(`/api/drinks?letter=${letter}`) 
      .then((response) => {
        this.setState({ drinks: response.data, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching drinks:', error);
        this.setState({ error: 'Failed to load drinks', loading: false });
      });
  };

  handleLetterClick = (letter) => {
    this.setState({ selectedLetter: letter });
    this.fetchDrinks(letter);
  };

  renderAlphabetButtons = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.map((letter) => (
      <Button
        key={letter}
        onClick={() => this.handleLetterClick(letter)}
        variant={this.state.selectedLetter === letter ? 'primary' : 'secondary'}
        className="m-1"
      >
        {letter}
      </Button>
    ));
  };

  render() {
    const { drinks, loading, error, selectedLetter } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <>
        <h1>Welcome to the Community Tab</h1>
        <div>
          <p>Click a letter to swap the drinks listed:</p>
          <div>{this.renderAlphabetButtons()}</div>
        </div>
        <p>
          Here you can see your New Custom Drinks, Your Current Go To, or that old
          Faithful from College
        </p>
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
            {drinks.map((drink) => (
              <Col key={drink.idDrink}>
                <DrinkEntry drink={drink} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default Community;
