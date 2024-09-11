import React from 'react';
import axios from 'axios';
import HomeRandom from './homepageChildren/HomeRandom.jsx';
import Search from './homepageChildren/Search.jsx';
import HomeResults from './homepageChildren/HomeResults.jsx';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleSearch(searched) {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searched}`,
      )
      .then((res) => {
        this.setState({ results: res.data.drinks || [] });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error: Search not performed', err);
      });
  }

  render() {
    const { results } = this.state;
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
