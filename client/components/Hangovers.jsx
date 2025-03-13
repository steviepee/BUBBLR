import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const Hangovers = () => {
  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then((info) => {
        console.log(info);
      })
      .catch((err) => console.error(err));
  };
  return <Container></Container>;
};

export default Hangovers;
