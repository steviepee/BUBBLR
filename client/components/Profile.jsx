import React from 'react';
import axios from 'axios';

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
      <div>
        <h3>
          User Profile
          {/* should have name, friends, and when joined */}
        </h3>
        <h2>{ displayName }</h2>
        <p>You joined on: { createdAt }</p>
        <div>
          User concoctions
          <ul>
            <li>Boozy Hibiscus Tea</li>
          </ul>
        </div>
        <div>
          Favorite drinks
          <ul>
            <li>Bushwacker</li>
            <li>French 75</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Profile;