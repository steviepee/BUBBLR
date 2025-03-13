import React from 'react';
import axios from 'axios';

const Hangovers = () => {
  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then((info) => {
        console.log(info);
      })
      .catch((err) => console.error(err));
  };
  return <div></div>;
};

export default Hangovers;
