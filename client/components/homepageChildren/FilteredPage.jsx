import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrinkEntry from '../communityChildren/DrinkEntry';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function FilteredPage({ filterType }) {
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  let { filter } = useParams();
  let filterRedid;

  filterRedid = encodeURIComponent(filter);
  if (filter.startsWith('Other')) {
    filterRedid = filterRedid + '/%20Unknown';
  } else if (filter.startsWith('Punch')) {
    filterRedid = filterRedid + '/%20Party%20Drink';
  } else if (filter.startsWith('Coffee')) {
    filterRedid = filterRedid + '/%20Tea';
  }

  console.log(filter);
  useEffect(() => {
    const fetchFilteredDrinks = async () => {
      try {
        let response;

        if (filterType === 'alcoholic') {
          response = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filterRedid}`,
          );
        } else if (filterType === 'category') {
          response = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterRedid}`,
          );
        }

        setFilteredDrinks(response.data.drinks || []);
        // }
      } catch (error) {
        console.error('Error fetching filtered drinks:', error);
      }
    };

    fetchFilteredDrinks();
  }, [filterRedid, filterType]);
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
        {filteredDrinks.map((drink) => (
          <Col key={drink.idDrink}>
            <Link
              to={`/estdrink/${drink && drink.idDrink}`}
              style={{ color: '#ffba0f' }}
            >
              <DrinkEntry currDrink={drink} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FilteredPage;
