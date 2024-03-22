/* eslint-disable no-plusplus */
import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
// import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import OgDrink from './profileChildren/OgDrink';
import Concoction from './profileChildren/Concoction';
import UserSearch from './profileChildren/UserSearch';
import FriendItem from './profileChildren/FriendItem';

import fakeData from '../FakeData.json';
import { drinks } from '../moreFakeData.json';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
      ogDrinkData: fakeData.drinks.slice(0, 5),
      concoctionData: drinks,
      // currently is controlling every modal
      // show: false,
      id: 1,
      friends: [],
    };

    this.getUser = () => {
      const { id } = this.state;
      axios
        .get(`/profile/${id}`)
        .then((userResponse) => {
          const { displayName, createdAt } = userResponse.data;

          // need to update drinks/concoctions/friends this way as well
          this.setState({ displayName, createdAt, id });
          return axios.get(`/profile/friends/${id}`);
        })
        .then(({ data }) => {
          // console.log(data);
          this.setState({ friends: data });
          console.log(this.state.friends);
        })
        .catch((err) => console.error('Failed getting user data', err));
    };

    this.followUser = (idFollow) => {
      const { id } = this.state;
      axios.post('/profile/follow', { id, idFollow })
        .then(() => axios.get(`/profile/friends/${id}`))
        .then(({ data }) => {
          // this is not updating state atm
          this.setState({ friends: data });
        });
    };

    this.handleClose = (scope) => scope(false);
    this.handleShow = (scope) => scope(true);

    // this function will need to make an axios request to update db
    this.handleSubmit = (scope) => {
      const { strDrink, strCategory } = scope.state;
      console.log(strDrink, strCategory);
      this.handleClose(scope.setShow);
    };

    // this function will need to make an axios request to update db
    this.removeDrink = (e) => {
      const { ogDrinkData, concoctionData } = this.state;
      let targetDrinkGroup;
      let isOgDrink = false;
      if (e.target.className.includes('ogDrink')) {
        targetDrinkGroup = ogDrinkData;
        isOgDrink = true;
      } else if (e.target.className.includes('concoction')) {
        targetDrinkGroup = concoctionData;
      }
      for (let i = 0; i < targetDrinkGroup.length; i++) {
        if (targetDrinkGroup[i].idDrink === e.target.value) {
          targetDrinkGroup.splice(i, 1);
          // eslint-disable-next-line no-unused-expressions
          isOgDrink
            ? this.setState({ ogDrinkData })
            : this.setState({ concoctionData });
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
      displayName, createdAt, ogDrinkData, concoctionData, friends, // show,
    } = this.state;
    return (
      <>
        <UserSearch followUser={this.followUser} />
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text>{displayName}</Card.Text>
            <Card.Text>{`You joined on: ${createdAt}`}</Card.Text>
            <Card>
              <Card.Body>
                <Card.Title>Your Friends</Card.Title>
                <Card.Text>
                  <ListGroup>
                    {friends.map((friend) => <FriendItem friend={friend} />)}
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Concoctions</Card.Title>
            <Container>
              <Row>
                {concoctionData.map((drink, index) => (
                  <Concoction
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}
                    // show={show}
                    handleSubmit={this.handleSubmit}
                    removeDrink={this.removeDrink}
                    drink={drink}
                    key={`conc-${drink.idDrink}`}
                    index={index}
                    getIngredients={this.getIngredients}
                  />
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Favorite Originals</Card.Title>
            <Container>
              <Row>
                {ogDrinkData.map((drink) => (
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
