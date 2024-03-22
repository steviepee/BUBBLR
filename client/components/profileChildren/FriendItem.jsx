import React from 'react';
import PropTypes from 'prop-types';

import ListGroupItem from 'react-bootstrap/ListGroupItem';

function FriendItem({ friend }) {
  return (
    <ListGroupItem>
      { friend.displayName }
    </ListGroupItem>
  );
}

FriendItem.propTypes = {
  friend: PropTypes.object.isRequired,
};

export default FriendItem;
