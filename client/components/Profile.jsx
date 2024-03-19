import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super();

    this.state = {
      displayName: 'User',
    }

    this.getUser = () => {
      axios.get('/profile/1')
        .then((userResponse) => {
          const { displayName } = userResponse.data;

          this.setState({ displayName });
        })
        .catch((err) => console.error('Failed getting user data', err));
    }

  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { displayName } = this.state;
    return (
      <div>
        <h3>
          User Profile { displayName }
          {/* should have name, friends, and when joined */}
        </h3>
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