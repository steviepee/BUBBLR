import React, { useState } from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UserSearch() {
  const [search, updateSearch] = useState('');

  const onChange = (e) => {
    updateSearch(e.target.value);
  };

  const onSearch = () => {
    console.log(search);
    axios.get(`/profile/users/${search}`)
      .then(({ data }) => console.log(data))
      .catch((err) => console.error('failed searching users: ', err));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Find Users</Card.Title>
        <InputGroup onChange={onChange} className="mb-3">
          <Form.Control
            placeholder="Search by name"
            aria-label="Search by name"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={onSearch}>
            Search
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export default UserSearch;
