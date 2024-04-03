import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

function UserItem({ user, followUser }) {
  const { id, displayName } = user;
  return (
    <ListGroupItem>
      {displayName}
      <Button onClick={() => { followUser(id); }}>Follow</Button>
      <Link to={`friend/${id}`}>
        <Button>See page</Button>
      </Link>
    </ListGroupItem>
  );
}

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  followUser: PropTypes.func.isRequired,
};

export default UserItem;
