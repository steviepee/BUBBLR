import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DrinkEntry({ drink }) {
  const navigate = useNavigate();
  const { strIngredient1, strIngredient2, strIngredient3, strDrinkThumb, strDrink, strCategory, strGlass } = drink;
  const threeMainIngredients = [strIngredient1, strIngredient2];
  if (strIngredient3) {
    threeMainIngredients.push(strIngredient3);
  }

  const handleClick = () => {
    navigate(`/drink/${drink.idDrink}`);
  };

  return (
    <Card
      style={{ width: '18rem', cursor: 'pointer' }}
      className='text-center'
      bg='dark'
      text='light'
      border='light'
      onClick={handleClick}
    >
      <Card.Body>
        <Card.Img
          variant='top'
          src={strDrinkThumb}
          style={{ width: '160px', height: '160px' }}
        />
        <Card.Title>{strDrink}</Card.Title>
        <Card.Subtitle className='mb-2 text-secondary'>
          {strCategory}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-secondary'>
          {strGlass}
        </Card.Subtitle>
        <Card.Text>{threeMainIngredients.join(', ')}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DrinkEntry;
