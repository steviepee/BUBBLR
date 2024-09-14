import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';

class HomeRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomDrink: null,
      glitchPH: true,
    };
  }

  componentDidMount() {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((rand) => {
        this.setState({ randomDrink: rand.data.drinks[0], glitchPH: false });
      })
      .catch((err) => {
        throw new Error('Error getting drink pick', err);
      });
  }

  render() {
    const { glitchPH } = this.state;
    if (glitchPH) {
      return (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      );
    }
    const { randomDrink } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '22rem',
            background: 'linear-gradient(135deg, #6b0042, #8e2b73)',
            color: '#ffba0f',
          }}
          className='text-center'
        >
          <Card.Body>
            <Card.Title>Bubblr Random Picks</Card.Title>

            <Link
              to={`/estdrink/${randomDrink && randomDrink.idDrink}`}
              style={{ color: '#ffba0f' }}
            >
              <Card.Title>{randomDrink && randomDrink.strDrink}</Card.Title>
              <img
                src={randomDrink && randomDrink.strDrinkThumb}
                style={{
                  width: 'auto',
                  maxHeight: '15rem',
                  maxWidth: '100%',
                  margin: '0 auto',
                  borderRadius: '15px',
                }}
                alt={randomDrink && randomDrink.strDrink}
              />
            </Link>
            <Card.Text>
              {(randomDrink && randomDrink.strIBA) || randomDrink.strCategory}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default HomeRandom;
