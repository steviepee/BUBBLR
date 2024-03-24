import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

function FriendItem({ friend, unfollowUser }) {
  const { displayName, id } = friend;
  return (
    <ListGroupItem>
      { displayName }
      <Link to={`friend/${id}`}>
        <Button>See page</Button>
      </Link>
      <Button variant="danger" onClick={() => unfollowUser(id)}>Unfollow</Button>
    </ListGroupItem>
  );
}

FriendItem.propTypes = {
  friend: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

export default FriendItem;
