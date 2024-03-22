import React from 'react';
import PropTypes from 'prop-types';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

function FriendItem({ friend, unfollowUser }) {
  return (
    <ListGroupItem>
      { friend.displayName }
      <Button>See page</Button>
      <Button variant='danger' onClick={() => unfollowUser(friend.id)}>Unfollow</Button>
    </ListGroupItem>
  );
}

FriendItem.propTypes = {
  friend: PropTypes.object.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

export default FriendItem;
