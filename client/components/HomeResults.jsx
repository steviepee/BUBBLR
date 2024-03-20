import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

class HomeResults extends React.Component {
  render() {
    let { results } = this.props;
    return (
      <div>
        <h4>Searched Results</h4>
        {results.map((drink, index) => (
          <div key={index}>
            <Link to={`/estdrink/${drink.idDrink}`}>
              <h5>{drink.strDrink}</h5>
              <img
                src={drink.strDrinkThumb}
                style={{ width: '220px', height: '220px' }}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default HomeResults;
