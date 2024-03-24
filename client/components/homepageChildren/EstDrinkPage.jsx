import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EstDrinkPage() {
  const [drink, setDrink] = useState(null);
  const { id } = useParams(); //yt vid from ky

  useEffect(() => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        const drinkData = response.data.drinks[0];
        setDrink(drinkData);

        let ingreMeasure = [];
        for (let i = 1; i <= 15; i++) {
          let ingredient = drinkData[`strIngredient${i}`];
          let measurement = drinkData[`strMeasure${i}`];
          if (ingredient && measurement) {
            ingreMeasure.push({ ingredient, measurement });
          } else if (ingredient && !measurement) {
            ingreMeasure.push({ ingredient });
          }
        }

        axios
          .post('/api/estDrinks', {
            drinkId: drinkData.idDrink,
            drinkName: drinkData.strDrink,
            drinkCategory: drinkData.strCategory,
            alcoholicDrink: drinkData.strAlcoholic,
            drinkGlass: drinkData.strGlass,
            drinkInstructions: drinkData.strInstructions,
            drinkIngredients: ingreMeasure,
            drinkImage: drinkData.strDrinkThumb,
          })
          .then((response) => {
            console.log(`Saved ${drinkData.strDrink}`, response.data);
          })
          .catch((err) => {
            console.error('Did not save:', err);
          });
      })
      .catch((error) => {
        console.error('Error fetching drink details:', error);
      });
  }, [id]);

  // let formatMeasure = (drinkData) => {
  //   let measurements = [];
  //   for(let i = 1; i <= 15; i++){
  //     let ingredient = drinkData[`strMeasure${i}`];
  //     if(measurement){
  //       ingredients.push(ingredient)
  //     }
  //   }
  //   return measurements;
  // }

  return (
    <div>
      {drink && (
        <div>
          <h2>{drink.strDrink}</h2>
          <img
            src={drink.strDrinkThumb}
            style={{ width: '350px', height: '350px' }}
            alt={drink.strDrink}
          />
          <h3>Ingredients:</h3>
          <ul>
            {Object.entries(drink)
              .filter(
                ([key, value]) => key.startsWith('strIngredient') && value,
              )
              .map(([key, value]) => (
                <li key={key}>
                  {value}:{drink[`strMeasure${key.slice(-1)}`]}
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
