import React, { useEffect, useState } from 'react';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NavFilter() {
  const [filters, setFilters] = useState({
    categories: [],
    alcoholic: [],
  });

  useEffect(() => {
    axios
      .all([
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'),
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list'),
      ])
      .then(
        axios.spread(
          (categoriesResponse, alcoholicResponse) => {
            let categories = categoriesResponse.data.drinks.map(
              (drink) => drink.strCategory
            );
            let alcoholic = alcoholicResponse.data.drinks.map(
              (drink) => drink.strAlcoholic
            );
            setFilters({ categories, alcoholic});
          }
        )
      )
      .catch((error) => {
        console.error('Error fetching filters:', error);
      });
  }, []);

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/home'>Bubblr</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link as={Link} to='/profile'>Account</Nav.Link>
            <Nav.Link as={Link} to='/community'>Community</Nav.Link>
            <NavDropdown title='Filters' id='navbarScrollingDropdown'>
              <NavDropdown title='Categories' id='navbarScrollingDropdown'>
                {filters.categories.map((category, index) => (
                  <NavDropdown.Item
                    key={`c-${index}`}
                    as={Link}
                    to={`/filtered/${category}`}
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown.Divider />
              <NavDropdown title='Alcoholic' id='navbarScrollingDropdown'>
                {filters.alcoholic.map((type, index) => (
                  <NavDropdown.Item
                    key={`a-${index}`}
                    as={Link}
                    to={`/filtered/${type}`}
                  >
                    {type}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavFilter;