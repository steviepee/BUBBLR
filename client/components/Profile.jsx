import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OgDrink from './profileChildren/OgDrink';
import Concoction from './profileChildren/Concoction';

import fakeData from '../FakeData.json';
// import moreFakeData from '../MoreFakeData.json';
import { drinks } from '../moreFakeData.json';

// import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap from 'bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
      favFakeData: fakeData.drinks.slice(0, 5),
      moreFakeData: drinks,
    };

    this.getUser = () => {
      axios
        .get('/profile/1')
        .then((userResponse) => {
          const { displayName, createdAt } = userResponse.data;

          // need to update drinks/concoctions/friends this way as well
          this.setState({ displayName, createdAt });
        })
        .catch((err) => console.error('Failed getting user data', err));
    };

    // this is working but has no persistence
    this.removeDrink = (e) => {
      const { favFakeData, moreFakeData } = this.state;
      console.log(e.target.className);
      let targetDrinkGroup;
      let isOgDrink = false;
      if (e.target.className.includes('ogDrink')) {
        targetDrinkGroup = favFakeData;
        isOgDrink = true;
      } else if (e.target.className.includes('concoction')) {
        targetDrinkGroup = moreFakeData;
      }
      for (let i = 0; i < targetDrinkGroup.length; i++) {
        if (targetDrinkGroup[i].idDrink === e.target.value) {
          targetDrinkGroup.splice(i, 1);
          // this.setState({ favFakeData });
          if (isOgDrink) {
            this.setState({ favFakeData });
          } else {
            this.setState({ moreFakeData });
          }
        }
      }
    };

    this.getIngredients = (drink) => {
      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        const stringIngredient = `strIngredient${i}`;
        if (drink[stringIngredient]) {
          ingredients.push(` ${drink[stringIngredient]}`);
        } else {
          return ingredients;
        }
      }

      return ingredients;
    };
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const {
      displayName,
      createdAt,
      favFakeData,
      moreFakeData,
    } = this.state;
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text>{displayName}</Card.Text>
            <Card.Text>{`You joined on: ${createdAt}`}</Card.Text>
            <Card>
              <Card.Body>
                <Card.Title>Your Friends</Card.Title>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Concoctions</Card.Title>
            <Accordion>
              {moreFakeData.map((drink, index) => (
                <Concoction
                  removeDrink={this.removeDrink}
                  drink={drink}
                  key={`conc-${drink.idDrink}`}
                  index={index}
                  getIngredients={this.getIngredients}
                />
              ))}
            </Accordion>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Favorite Originals</Card.Title>
            <Container>
              <Row>
                {favFakeData.map((drink) => (
                  <OgDrink
                    removeDrink={this.removeDrink}
                    key={drink.idDrink}
                    drink={drink}
                    getIngredients={this.getIngredients}
                  />
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Profile;
