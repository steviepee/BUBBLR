import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OgDrink from './profileChildren/OgDrink.jsx';
import Concoction from './profileChildren/Concoction.jsx';

import fakeData from '../FakeData.json';
// import moreFakeData from '../MoreFakeData.json';
import { drinks } from '../MoreFakeData.json';


// import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap from 'bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
      favFakeData: fakeData.drinks.slice(0, 5),
      moreFakeData: drinks
    }

    this.getUser = () => {
      axios.get('/profile/1')
        .then((userResponse) => {
          const { displayName, createdAt } = userResponse.data;

          // need to update drinks/concoctions/friends this way as well
          this.setState({ displayName, createdAt });
        })
        .catch((err) => console.error('Failed getting user data', err));
    }

    // this is working but has no persistence
    this.removeFavorite = (e) => {
      const { favFakeData } = this.state;
      for(let i = 0; i < favFakeData.length; i++) {
        if(favFakeData[i].idDrink === e.target.value){
          favFakeData.splice(i, 1);
          this.setState({ favFakeData });
        }
      }
    }

    this.getIngredients = (drink) => {
      const ingredients = [];
      for(let i = 1; i < 16; i++){
        const stringIngredient = `strIngredient${i}`;
        if(drink[stringIngredient]){
          ingredients.push(` ${drink[stringIngredient]}`);
        } else {
          return ingredients;
        }
      }
  
      return ingredients;
    }

  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { displayName, createdAt, favFakeData, moreFakeData } = this.state;
    // const favFakeData = fakeData.drinks.slice(0, 5);
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text>{ displayName }</Card.Text>
            <Card.Text>You joined on: { createdAt }</Card.Text>
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
            <Accordion >
              {/* these items will need to be there own component possibly the accordion as well? */}
              {moreFakeData.map((drink, index) => <Concoction drink={drink} key={`conc-${drink.idDrink}`} index={index} getIngredients={this.getIngredients} />)}
            </Accordion>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Favorite Originals</Card.Title>
            <Container>
              <Row>
                {favFakeData.map((drink) => <OgDrink removeFavorite={this.removeFavorite} key={drink.idDrink} drink={drink} getIngredients={this.getIngredients} />)}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Profile;