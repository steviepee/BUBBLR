import React, { Component } from 'react';
import '../../styling/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedDrink: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchedDrink: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchedDrink);
  }

  render() {
    return (
      <form onSubmit={this.handleSearch} className='search-form'>
        <input
          type='text'
          value={this.state.searchedDrink}
          onChange={this.handleChange}
          placeholder='Search drinks...'
          className='search-input'
        />
        <button type='submit' className='search-button'>Grab a Drink</button>
      </form>
    );
  }
}

export default Search;
