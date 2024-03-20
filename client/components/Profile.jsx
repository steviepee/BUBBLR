import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

// import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap from 'bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
    }

    this.getUser = () => {
      axios.get('/profile/1')
        .then((userResponse) => {
          const { displayName, createdAt } = userResponse.data;

          this.setState({ displayName, createdAt });
        })
        .catch((err) => console.error('Failed getting user data', err));
    }

  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { displayName, createdAt } = this.state;
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
            <Card.Title>Your concoctions</Card.Title>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey='0' >
          {/* these items will need to be there own component possibly the accordion as well? */}
          <Accordion.Item eventKey='0' >
            <Accordion.Header>Boozy Hibiscus Tea</Accordion.Header>
            <Accordion.Body> Info on this drink </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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