import React from 'react';
import DrinkTags from './DrinkTags.jsx';
import Card from 'react-bootstrap/Card';

function DrinkEntry({ currDrink }) {
  const { strIngredient1, strIngredient2, strIngredient3 } = currDrink;
  const threeMainIngredients = [strIngredient1, strIngredient2, strIngredient3];
  const splitStringTags =
    currDrink.strTags !== null ? currDrink.strTags.split(',') : [''];
  return (
    <Card
      style={{ width: '18rem' }}
      className='text-center'
      bg='dark'
      text='light'
      border='light'
    >
      {/* {console.log(currDrink)} */}
      <Card.Body>
        <Card.Img
          variant='top'
          src={currDrink.strDrinkThumb}
          // style={{ width: '160px', height: '160px' }}
        />
        <Card.Title>{currDrink.strDrink}</Card.Title>
        <Card.Subtitle className='mb-2 text-secondary'>
          {' '}
          {currDrink.strCategory}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-secondary'>
          {' '}
          {currDrink.strGlass}
        </Card.Subtitle>
        <Card.Text>
          {threeMainIngredients.map((ele) => ` ${ele} `)}
          <br />
          {splitStringTags.map((tag, id) => {
            if (tag !== '') {
              return <DrinkTags tag={tag} key={id} />;
            }
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DrinkEntry;
