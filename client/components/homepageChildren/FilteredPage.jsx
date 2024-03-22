import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrinkEntry from '../communityChildren/DrinkEntry';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';


const FilteredPage = ({ filterType }) => {
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  let { filter } = useParams()
  
  let filterRedid = encodeURIComponent(filter.replace(/\//g, '%2F'));

  console.log(filter)
  useEffect(() => {
    const fetchFilteredDrinks = async () => {
      try {
        console.log('HERE', this);
        //  const filter = location.search.substring(1);
        let response;
        // let filterQuery = filter[0].toLowerCase();
        // response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filterQuery}=${filter}`)
        if(filterType === 'alcoholic') {
          console.log(filter, 'ALC LOGGED filter redid - ', filterRedid)
          response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filterRedid}`);
        } else if(filterType === 'category') {
          console.log(filter, 'Cat LOGGED filter redid - ', filterRedid)
          response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterRedid}`);
        };
        
        // console.log(response.data.drinks) 
        //  if( response && response.data && response.data.drinks) {
          
          setFilteredDrinks(response.data.drinks || []);
        // }
      } catch (error) {
        console.error('Error fetching filtered drinks:', error);
      }
    };

    fetchFilteredDrinks();
  }, [filterRedid, filterType]);
// console.log('drinks', filteredDrinks);
  return (
    // <h1>Hello World!</h1>
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
        {filteredDrinks.map((drink) => (
          <Col key={drink.idDrink}>
            <Link to={`/estdrink/${drink.idDrink}`}>
            <DrinkEntry currDrink={drink} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FilteredPage;