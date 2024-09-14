/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import HomeRandom from './homepageChildren/HomeRandom.jsx';
import Search from './homepageChildren/Search.jsx';
import HomeResults from './homepageChildren/HomeResults.jsx';
import '../styling/Homepage.css';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searched) {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searched}`)
      .then((res) => {
        this.setState({ results: res.data.drinks || [] });
      })
      .catch((err) => {
        throw new Error('Error: Search not performed', err);
      });
  }

  render() {
    const { results } = this.state;
    return (
      <Container className='homepage'>
        <Row className='mb-4'>
          <Col>
            <h2 className='text-center'>It's five o'clock somewhere</h2>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <Search onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <HomeRandom />
          </Col>
        </Row>
        {results.length > 0 && <HomeResults results={results} />}
      </Container>
    );
  }
}

export default Homepage;
