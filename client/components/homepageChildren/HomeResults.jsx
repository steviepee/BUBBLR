import React from 'react';
import { Link } from 'react-router-dom';
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
    );
  }
}

export default HomeResults;
