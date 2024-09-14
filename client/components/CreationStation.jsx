/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CreationStation = () => {
  const [newIngredients, updateIngredients] = useState([]);
  const [savedDrinks, updateSavedDrinks] = useState([]);
  const [drinkName, setDrinkName] = useState('');
  const [activeIngredients, updateActiveIngredients] = useState([]);
  const [saved, updateSaved] = useState('false');

  function getAllIngredients() {
    axios.get('/api/getIngredients')
      .then((results) => {
        const storage = [];
        results.data.forEach((drink) => {
          storage.push(drink.strIngredient1);
        });
        const sortedIng = storage.sort((a, b) => a.localeCompare(b));
        updateIngredients(sortedIng);
      })
      .catch((err) => console.error(err));
  }

  function getAllSavedDrinks() {
    axios.get('/api/customDrinks')
      .then((results) => {
        updateSavedDrinks(results.data);
      })
      .catch((err) => console.error(err));
  }

  function saveToCollectionClick() {
    axios.post('/api/customDrinks', {
      drinkName,
      drinkIngredients: JSON.stringify(activeIngredients),
    })
      .then(() => {})
      .catch((err) => console.error(err));
  }

  function showSavedDrinks() {
    if (saved === 'true') {
      return (
        <div>
          <h2>Saved Drinks:</h2>
          <Row xs={1} md={5} className="g-3">
            {savedDrinks.length && savedDrinks.map((drink, idx) => (
              <Col key={idx}>
                <Card style={{ marginBottom: '10px', backgroundColor: '#ffba0f' }}>
                  <Card.Body>
                    <Card.Title>{drink.drinkName}</Card.Title>
                    <Button
                      onClick={() => updateActiveIngredients(JSON.parse(drink.drinkIngredients))}
                    >
                      ➕
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h2>Additional Ingredients:</h2>
          <Row xs={1} md={5} className="g-3">
            {newIngredients.length && newIngredients.map((ingredient, idx) => (
              <Col key={idx}>
                <Card style={{
                  marginBottom: '10px',
                  background: 'linear-gradient(135deg, #6b0042, #8e2b73)',
                  color: 'whitesmoke',
                }}>
                  <Card.Body>
                    <Card.Title>{ingredient}</Card.Title>
                    <Button
                      onClick={() => {
                        activeIngredients.push(ingredient);
                        const newActiveIngredients = [...activeIngredients];
                        updateActiveIngredients(newActiveIngredients);
                      }}
                      style={{ backgroundColor: '#ffba0f' }}
                    >
                      ➕
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
    return (
      <div>
        <Row xs={1} md={5} className="g-3">
          {newIngredients.length && newIngredients.map((ingredient, idx) => (
            <Col key={idx}>
              <Card style={{
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #6b0042, #8e2b73)',
                color: 'whitesmoke',
              }}>
                <Card.Body>
                  <Card.Title>{ingredient}</Card.Title>
                  <Button
                    type="submit"
                    onClick={() => {
                      activeIngredients.push(ingredient);
                      const newActiveIngredients = [...activeIngredients];
                      updateActiveIngredients(newActiveIngredients);
                    }}
                    style={{ background: '#ffba0f' }}
                  >
                    ➕
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  useEffect(() => {
    getAllIngredients();
    getAllSavedDrinks();
    showSavedDrinks();
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Creation Station</h1>
      <br />
      <Button
        style={{ background: 'linear-gradient(135deg, #6b0042, #8e2b73)', color: '#ffba0f' }}
        onClick={() => {
          getAllIngredients();
          updateSaved('false');
        }}
      >
        Build From Scratch
      </Button>
        {' '}
      <Button
        style={{ background: 'linear-gradient(135deg, #6b0042, #8e2b73)', color: '#ffba0f' }}
        onClick={() => updateSaved('true')}
      >
        My Saved Recipes
      </Button>
      <br />
      <br />
      <div style={{
        marginLeft: '40px',
        marginRight: '40px',
        height: '500px',
        overflowY: 'scroll',
      }}>
        {showSavedDrinks()}
      </div>
      <br />
      <br />
      <h2>Your Mixers</h2>
      <h4>Remove a mixer by clicking its ❌</h4>
      <ul>
        {activeIngredients.map((ingredient, i) => (
          <li key={i}>{ingredient}
            <span onClick={() => {
              const idx = activeIngredients.indexOf(ingredient);
              if (idx > -1) {
                activeIngredients.splice(idx, 1);
                const newActiveIngredients = [...activeIngredients];
                updateActiveIngredients(newActiveIngredients);
              }
            }}>
              ❌
            </span>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <h2>Name your concoction</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text
          id="inputGroup-sizing-default"
          style={{ background: 'linear-gradient(135deg, #6b0042, #8e2b73)', color: '#ffba0f' }}
        >
          Name it here
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          style={{ backgroundColor: '#434343', color: '#ffffff' }}
          onChange={(e) => setDrinkName(e.target.value)}
        />
      </InputGroup>
      <br />
      <Button
      variant="success"
      onClick={() => {
        saveToCollectionClick();
        window.location.reload(false);
      }}>
        Save my concoction
      </Button>
    </div>
  );
};

export default CreationStation;
