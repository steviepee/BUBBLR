import React from 'react';
import axios from 'axios';
import HomeRandom from './homepageChildren/HomeRandom.jsx';
import Search from './homepageChildren/Search.jsx';
import HomeResults from './homepageChildren/HomeResults.jsx';
import { Routes, Route, Link } from 'react-router-dom';
import NavFilter from './homepageChildren/NavFilter.jsx';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleSearch = (searched) => {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searched}`,
      )
      .then((res) => {
        this.setState({ results: res.data.drinks || [] });
        console.log(`'${searched}' was searched.`);
      })
      .catch((err) => {
        console.error('Error: Search not performed', err);
      });
  };

  render() {
    let { results } = this.state;
    return (
      <div>
        <h2> Bubblr </h2>
        <Search onSearch={this.handleSearch} />
        <HomeRandom />
        {results.length > 0 && <HomeResults results={results} />}
      </div>
    );
  }
}

export default Homepage;
