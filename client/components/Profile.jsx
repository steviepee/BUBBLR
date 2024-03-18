import React from 'react';

function Profile() {
  return (
    <div>
      <h3>
        User Profile
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