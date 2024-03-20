import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OgDrink from './profileChildren/OgDrink.jsx';

import fakeData from '../FakeData.json';

// import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap from 'bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
      favFakeData: fakeData.drinks.slice(0, 5)
    }

    this.getUser = () => {
      axios.get('/profile/1')
        .then((userResponse) => {
          const { displayName, createdAt } = userResponse.data;

          this.setState({ displayName, createdAt });
        })
        .catch((err) => console.error('Failed getting user data', err));
    }

    this.removeFavorite = (e) => {
      const { favFakeData } = this.state;
      console.log(e.target.value);
      for(let i = 0; i < favFakeData.length; i++) {
        if(favFakeData[i].idDrink === e.target.value){
          favFakeData.splice(i, 1);
          this.setState({ favFakeData });
        }
      }
    }

  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { displayName, createdAt, favFakeData } = this.state;
    // const favFakeData = fakeData.drinks.slice(0, 5);
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text>{ displayName }</Card.Text>
            <Card.Text>You joined on: { createdAt }</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Concoctions</Card.Title>
            <Accordion defaultActiveKey='0' >
              {/* these items will need to be there own component possibly the accordion as well? */}
              <Accordion.Item eventKey='0' >
                <Accordion.Header>Boozy Hibiscus Tea</Accordion.Header>
                <Accordion.Body> Info on this drink </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Your Favorite Originals</Card.Title>
            <Container>
              <Row>
                {favFakeData.map((drink) => <OgDrink removeFavorite={this.removeFavorite} key={drink.idDrink} drink={drink} />)}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    )
  }
}

    // <div>
    //     <h3>
    //       User Profile
    //       {/* should have name, friends, and when joined */}
    //     </h3>
    //     <h2>{ displayName }</h2>
    //     <p>You joined on: { createdAt }</p>
    //     <div>
    //       User concoctions
    //       <ul>
    //         <li>Boozy Hibiscus Tea</li>
    //       </ul>
    //     </div>
    //     <div>
    //       Favorite drinks
    //       <ul>
    //         <li>Bushwacker</li>
    //         <li>French 75</li>
    //       </ul>
    //     </div>
    //   </div>

export default Profile;