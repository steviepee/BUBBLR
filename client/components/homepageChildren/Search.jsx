import React from 'react';
import { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedDrink: '',
    };
  }

  handleChange = (e) => {
    this.setState({ searchedDrink: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchedDrink);
  };

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type='text'
          value={this.state.searchedDrink}
          onChange={this.handleChange}
          placeholder='Search Bubblr'
        />
        <button type='submit'>Search Bubblr</button>
      </form>
    );
  }
}

export default Search;
