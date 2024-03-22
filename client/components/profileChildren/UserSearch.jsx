/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import UserItem from './UserItem';

function UserSearch({ followUser }) {
  const [search, updateSearch] = useState('');

  const [searched, newSearch] = useState('');

  const [searchBool, hasSearched] = useState(false);

  const [searchedUsers, updateUsers] = useState([]);

  const onChange = (e) => {
    updateSearch(e.target.value);
  };

  const onSearch = () => {
    axios
      .get(`/profile/users/${search}`)
      .then(({ data }) => {
        // console.log(data);
        hasSearched(true);
        if (data) {
          updateUsers(data);
          newSearch(search);
        }
      })
      .catch((err) => console.error('failed searching users: ', err));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Find Users</Card.Title>
        <InputGroup onChange={onChange} className='mb-3'>
          <Form.Control
            placeholder='Search by name'
            aria-label='Search by name'
            aria-describedby='basic-addon2'
          />
          <Button
            variant='outline-secondary'
            id='button-addon2'
            onClick={onSearch}
          >
            Search
          </Button>
        </InputGroup>
        {searchBool ? (
          <Card.Text>{`Found ${searchedUsers.length} user(s) matching "${searched}"`}</Card.Text>
        ) : (
          <Card.Text>No Search</Card.Text>
        )}
        <ListGroup>
          {searchedUsers.length ? (
            searchedUsers.map((user) => (
              <UserItem user={user} followUser={followUser} key={`searched-${user.id}`} />
            ))
          ) : (
            <> </>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

UserSearch.propTypes = {
  followUser: PropTypes.func.isRequired,
};

export default UserSearch;
