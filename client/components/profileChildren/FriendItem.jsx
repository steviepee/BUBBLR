import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

function FriendItem({ friend, unfollowUser }) {
  return (
    <ListGroupItem>
      { friend.displayName }
      <Link to={`friend/${friend.id}`}>
        <Button>See page</Button>
      </Link>
      <Button variant="danger" onClick={() => unfollowUser(friend.id)}>Unfollow</Button>
    </ListGroupItem>
  );
}

FriendItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  friend: PropTypes.object.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

export default FriendItem;
