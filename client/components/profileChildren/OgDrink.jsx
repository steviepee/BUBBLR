/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function OgDrink({ drink, removeDrink }) {
  const { drinkId, drinkImage, drinkName, drinkCategory, drinkIngredients } = drink;
  return (
    <Col>
      <Card>
        <Card.Body>
          {/* <Link to={`/estDrink/${drink.idDrink}`}> */}
          <Link to={`/estDrink/${drinkId}`}>
            <Button
              size='sm'
            >
              Go To
            </Button>
          </Link>
          <Button
            size='sm'
            // value={drink.idDrink}
            value={drinkId}
            variant='danger'
            onClick={removeDrink}
            className='ogDrink'
          >
            Remove
          </Button>
          {/* <Card.Img variant='top' src={drink.strDrinkThumb} /> */}
          <Card.Img variant='top' src={drinkImage} />
          <Accordion>
            <Accordion.Header>
              {/* <Card.Title>{drink.strDrink}</Card.Title> */}
              <Card.Title>{drinkName}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  {/* <Card.Title>{drink.strCategory}</Card.Title> */}
                  <Card.Title>{drinkCategory}</Card.Title>
                  {/* <Card.Text>{drink.strTags}</Card.Text> */}
                  {/* <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text> */}
                  <Card.Text>Ingredients: </Card.Text>
                  {drinkIngredients.map((item) => (
                    <Card.Text key={`${drinkId}-${item.ingredient}`}>{`${item.ingredient}: ${item.measurement}`}</Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
}

// function OgDrink({ drink, removeDrink, getIngredients }) {
//   const ingredients = getIngredients(drink).toString();
//   return (
//     <Col>
//       <Card>
//         <Card.Body>
//           <Link to={`/estDrink/${drink.idDrink}`}>
//             <Button
//               size='sm'
//             >
//               Go To
//             </Button>
//           </Link>
//           <Button
//             size='sm'
//             value={drink.idDrink}
//             variant='danger'
//             onClick={removeDrink}
//             className='ogDrink'
//           >
//             Remove
//           </Button>
//           <Card.Img variant='top' src={drink.strDrinkThumb} />
//           <Accordion>
//             <Accordion.Header>
//               <Card.Title>{drink.strDrink}</Card.Title>
//             </Accordion.Header>
//             <Accordion.Body>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{drink.strCategory}</Card.Title>
//                   <Card.Text>{drink.strTags}</Card.Text>
//                   <Card.Text>{`Ingredients: ${ingredients}`}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Accordion.Body>
//           </Accordion>
//         </Card.Body>
//       </Card>
//     </Col>
//   );
// }

// OgDrink.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   drink: PropTypes.object.isRequired,
//   getIngredients: PropTypes.func.isRequired,
//   removeDrink: PropTypes.func.isRequired,
// };

OgDrink.propTypes = {
  drink: PropTypes.shape({
    drinkId: PropTypes.number.isRequired,
    drinkImage: PropTypes.string.isRequired,
    drinkName: PropTypes.string.isRequired,
    drinkCategory: PropTypes.string.isRequired,
    drinkIngredients: PropTypes.arrayOf(PropTypes.shape({
      ingredient: PropTypes.string.isRequired,
      measurement: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  removeDrink: PropTypes.func.isRequired,
};

export default OgDrink;
