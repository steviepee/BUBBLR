import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EstDrinkPage() {
  // this.state = {
  //     drink: null,
  // }
  const [drink, setDrink] = useState(null);
  const { id } = useParams(); //yt vid from ky

  useEffect(() => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        const drinkData = response.data.drinks[0];
        setDrink(drinkData);
      })
      .catch((error) => {
        console.error('Error fetching drink details:', error);
      });
  }, [id]);

  return (
    <div>
      {drink && (
        <div>
          <h2>{drink.strDrink}</h2>
          <img
            src={drink.strDrinkThumb}
            style={{ width: '350px', height: '350px' }}
          />
          <h3>Ingredients:</h3>
          <ul>
            {Object.entries(drink)
              .filter(
                ([key, value]) => key.startsWith('strIngredient') && value,
              )
              .map(([key, value]) => (
                <li key={key}>
                  {value}: {drink[`strMeasure${key.slice(-1)}`]}
                </li>
              ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{drink.strInstructions}</p>
          <h6>Please drink responsibly.</h6>
        </div>
      )}
    </div>
  );
}

export default EstDrinkPage;
