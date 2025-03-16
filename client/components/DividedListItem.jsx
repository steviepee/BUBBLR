import React from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';

const DividedListItem = ({
  element,
  index,
  collectionName,
  formValues,
  setFormValues,
  changeInputValue,
}) => {
  const handleDeleteClick = () => {
    const formCopy = { ...formValues };
    formCopy[collectionName].splice(index, 1);
    setFormValues(formCopy);
  };

  const handleEditClick = () => {
    handleDeleteClick();
    changeInputValue(collectionName, element);
  };
  return (
    <ListGroup>
      <ListGroup.Item>{element}</ListGroup.Item>
      <ListGroup.Item as='button' onClick={handleEditClick}>
        Edit
      </ListGroup.Item>
      <ListGroup.Item as='button' onClick={handleDeleteClick}>
        Delete
      </ListGroup.Item>
    </ListGroup>
  );
};

export default DividedListItem;
