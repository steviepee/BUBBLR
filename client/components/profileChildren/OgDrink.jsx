import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const OgDrink = ({ drink, removeFavorite, getIngredients }) => {
  // const ingredients = drink.reduce((acc, curr) => {
  //   if(curr){
  //     acc.push(cur);
  //   }
  // }, [])

  // console.log(ingredients);
  // console.log(drink);
  // const ingredients = () => {
  //   const ingredients = [];
  //   for(let i = 1; i < 16; i++){
  //     const stringIngredient = `strIngredient${i}`;
  //     if(drink[stringIngredient]){
  //       ingredients.push(drink[stringIngredient]);
  //     }
  //   }

  //   return ingredients;
  // }

  console.log(getIngredients(drink));
  return (
    <Col>
      <Card>
        <Card.Body>
          <Button
            size='sm'
            value={drink.idDrink}
            variant='danger'
            onClick={removeFavorite}
          >
            Remove
          </Button>
          <Card.Img variant='top' src={drink.strDrinkThumb} />
          <Accordion>
            <Accordion.Header>
              <Card.Title>{drink.strDrink}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Card.Title>{drink.strCategory}</Card.Title>
                  <Card.Text>{drink.strTags}</Card.Text>
                  <Card.Text>Ingredients: {}</Card.Text>
                  <Card.Text>Instructions: {drink.strInstructions}</Card.Text>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OgDrink;
