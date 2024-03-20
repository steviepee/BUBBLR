import React from 'react';
import FakeData from '../FakeData.json';
import DrinkEntry from './communityChildren/DrinkEntry';
import { Container, Row, Col } from 'react-bootstrap';

const Community = () => {
  return (
    <>
      <h1>Welcome to the Community Tab</h1>
      <p>
        Here you can see your New Custom Drinks, Your Current Go To, or that old
        Faithful from College
      </p>
      <Container>
        {/* <Row> */}
        <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
          {FakeData.drinks.map((drink) => (
            <Col key={drink.idDrink}>
              <DrinkEntry currDrink={drink} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Community;

// // export default Community;
// import React from 'react';
// import FakeData from '../FakeData.json';
// import DrinkEntry from './DrinkEntry';
// import { Container, Row, Col } from 'react-bootstrap';

// const Community = () => {
//   // Chunk the FakeData.drinks array into arrays of 4 drinks each
//   const chunkedDrinks = FakeData.drinks.reduce((resultArray, item, index) => {
//     const chunkIndex = Math.floor(index / 4);

//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = []; // start a new chunk
//     }

//     resultArray[chunkIndex].push(item);

//     return resultArray;
//   }, []);

//   return (
//     <>
//       <h1>Welcome to the Community Tab</h1>
//       <p>
//         Here you can see your New Custom Drinks, Your Current Go To, or that old Faithful from College
//       </p>
//       <Container>
//         {chunkedDrinks.map((chunk, index) => (
//           <Row key={index} xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
//             {chunk.map((drink) => (
//               <Col key={drink.idDrink}>
//                 <DrinkEntry currDrink={drink} />
//               </Col>
//             ))}
//           </Row>
//         ))}
//       </Container>
//     </>
//   );
// };

// export default Community;
