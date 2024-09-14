import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import DrinkEntry from '../communityChildren/DrinkEntry.jsx';

class HomeResults extends React.Component {
  render() {
    const { results } = this.props;
    return (
      <Container>
        <Row className='d-flex justify-content-center'>
          {results.map((drink) => (
            <Col
              key={drink.idDrink}
              sm={6}
              md={4}
              lg={3}
              className='d-flex justify-content-center mb-4'
            >
              <Link to={`/estdrink/${drink.idDrink}`} style={{ textDecoration: 'none' }}>
                <DrinkEntry drink={drink} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default HomeResults;
