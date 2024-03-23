import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner, Card } from 'react-bootstrap';

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
        console.error('Error getting drink pick', err);
      });
  }

  render() {
    let { glitchPH } = this.state;
    if (glitchPH) {
      return (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      );
    }
    let { randomDrink } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '22rem',
            backgroundColor: '#6b0042',
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

// function HomeRandom() {
//     return (
//         <h4>Bubblr Picks</h4>
//     )
// }

export default HomeRandom;
