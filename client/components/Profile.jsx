import React from 'react';
import axios from 'axios';

function Profile() {
  let displayName;
  const getUser = () => {
    axios.get('/profile/1')
      .then((userResponse) => {
        console.log('client side user response', userResponse);
        displayName = userResponse.data.displayName;
        console.log(displayName);
      })
      .catch((err) => console.error('Failed getting user data', err));
  }

  getUser();

  return (
    <div>
      <h3>
        User Profile {displayName}
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

export default Profile;