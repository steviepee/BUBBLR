import React from 'react';
import PropTypes from 'prop-types';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

function UserItem({ user, followUser }) {
  return (
    <ListGroupItem>
      {user.displayName}
      <Button onClick={() => { followUser(user.id); }}>Follow</Button>
      <Button>See page</Button>
    </ListGroupItem>
  );
}

UserItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
};

export default UserItem;
