import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import DrinkEntry from '../communityChildren/DrinkEntry';
import { Container, Row, Col } from 'react-bootstrap';

class HomeResults extends React.Component {
  render() {
    let { results } = this.props;
    return (
      <Container>
        {/* <Row> */}
        <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
          {results.map((drink) => (
            <Col key={drink.idDrink}>
              <Link to={`/estdrink/${drink.idDrink}`}>
                <DrinkEntry currDrink={drink} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      // <div>
      //   <h4>Searched Results</h4>
      //   {results.map((drink, index) => (
      //     <div key={index}>
      //       <Link to={`/estdrink/${drink.idDrink}`}>
      //         <h5>{drink.strDrink}</h5>
      //         <img
      //           src={drink.strDrinkThumb}
      //           style={{ width: '220px', height: '220px' }}
      //         />
      //       </Link>
      //     </div>
      //   ))}
      // </div>
    );
  }
}

export default HomeResults;
