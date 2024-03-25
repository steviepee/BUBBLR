import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem, Button, Card, Col, Row, Form, InputGroup } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// import getAllIngredients from 'server/api/api.js'

function CreationStation() { 
    //array of all ingredients in drinks pulled from API
    const [newIngredients, updateIngredients] = useState([])
    //array of all my saved drinks
    const [savedDrinks, updateSavedDrinks] = useState([])
    //array of ingredients currently in my drink
    const [activeIngredients, updateActiveIngredients] = useState([])
    //your custom drink name
    const [drinkName, setDrinkName] = useState('')
    //if savedDrinks is clicked, update variable
    const [saved, updateSaved] = useState('false')
    // getAllIngredients()

    function getAllIngredients() {
        axios.get('/api/getIngredients')
        .then((results) => {
            // console.log(results.data.drinks)
            let storage = []
            results.data.forEach((drink) => {
                storage.push(drink['strIngredient1'])
            })
            // console.log(storage)
            // updateIngredients(newIngredients => [...newIngredients, storage])
            updateIngredients(storage)
        })
    }


    function getAllSavedDrinks() {
        axios.get('/api/customDrinks')
        .then((results) => {
            console.log(results.data)
            updateSavedDrinks(results.data)
            // updateSaved('true')
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function saveToCollectionClick() {
        axios.post('/api/customDrinks', {
            drinkName: drinkName,
            drinkIngredients: JSON.stringify(activeIngredients)
        })
        .then(() => {
            // console.log('custom drink post was successful')

        })
        .catch((err) => {
            console.error(err)
        })
    }


    function showSavedDrinks() {
        if(saved === 'true'){
            // return savedDrinks.map((drink, i) => {
                return ( 
                <div>
                {/* <div style={{backgroundColor: "lightblue", marginBottom: "10px"}} key={i}>
                     {drink.drinkName} <span onClick={() => {
                        //  activeIngredients.push()
                         // console.log(newArr)
                         updateActiveIngredients(JSON.parse(drink.drinkIngredients))
                     }}>➕</span> 
                 </div> */}

                 {/* <Card style={{ width: '12rem', backgroundColor: "orange", marginBottom: "10px" }} key={i}>
                 <Card.Body>
                        <Card.Title>{drink.drinkName}</Card.Title>
                        <Button variant="primary" onClick={() => {
                        //  activeIngredients.push()
                         // console.log(newArr)
                         updateActiveIngredients(JSON.parse(drink.drinkIngredients))
                     }}>➕</Button>
                 </Card.Body>
                 </Card> */}
                 <h2>Saved Drinks:</h2>
                 <Row xs={1} md={3} className="g-3">
                    {savedDrinks.length && savedDrinks.map((drink, idx) => (
                        <Col >
                        <Card style={{marginBottom: "10px", backgroundColor: "orange", marginBottom: "10px"}}>
                            <Card.Body>
                            <Card.Title>{drink.drinkName}</Card.Title>
                            <Button variant="primary" onClick={() => {
                                // activeIngredients.push(ingredient)
                                // console.log(newArr)
                                updateActiveIngredients(JSON.parse(drink.drinkIngredients))
                            }}>➕</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                    <h2>Additional ingredients to choose from:</h2>
                    <Row xs={1} md={3} className="g-3">
                    {newIngredients.length && newIngredients.map((ingredient, idx) => (
                        <Col >
                        <Card style={{marginBottom: "10px", backgroundColor: "lightblue", marginBottom: "10px"}}>
                            <Card.Body>
                            <Card.Title>{ingredient}</Card.Title>
                            <Button variant="primary" onClick={() => {
                                activeIngredients.push(ingredient)
                                // console.log(newArr)
                                const newActiveIngredients = [...activeIngredients]

                                updateActiveIngredients(newActiveIngredients)
                            }}>➕</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                 </div>
                )
            //  })
        } else {
            // return newIngredients.map((ingredient, i) => {
                return ( 
                <div>
                {/* <div style={{backgroundColor: "lightblue", marginBottom: "10px"}} key={i}>
                     {ingredient} <span onClick={() => {
                         activeIngredients.push(ingredient)
                         // console.log(newArr)
                         updateActiveIngredients(activeIngredients)
                     }}>➕</span> 
                 </div> */}
                 {/* <Card style={{ width: '12rem', backgroundColor: "lightblue", marginBottom: "10px" }} key={i}>
                    <Card.Body>
                        <Card.Title>{ingredient}</Card.Title>
                        <Button variant="primary" onClick={() => {
                         activeIngredients.push(ingredient)
                         // console.log(newArr)
                         updateActiveIngredients(activeIngredients)
                     }}>➕</Button>
                    </Card.Body>
                    </Card> */}
                    <Row xs={1} md={3} className="g-3">
                    {newIngredients.length && newIngredients.map((ingredient, idx) => (
                        <Col >
                        <Card style={{marginBottom: "10px", backgroundColor: "lightblue", marginBottom: "10px"}}>
                            <Card.Body>
                            <Card.Title>{ingredient}</Card.Title>
                            <Button type="submit" variant="primary" onClick={() => {
                                activeIngredients.push(ingredient)
                                const newActiveIngredients = [...activeIngredients]
                                // console.log(newArr)
                                updateActiveIngredients(newActiveIngredients)
                                console.log('success')
                            }}>➕</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                 </div>
                )
            //  })
        }
    }

    useEffect(() => {
        getAllIngredients()
        getAllSavedDrinks()
        showSavedDrinks()
    }, [])


        return (
        <div style={{margin: "20px"}}>
            <h1> Welcome to the Creation Station</h1>
            <br />
            <Button onClick={() => {
                getAllIngredients()
                updateSaved('false')
            }}>Build From Scratch</Button>
            {' '}
            <Button onClick={() => {
                updateSaved('true')
            }}>My Saved Recipes</Button>
            <br />
            <br />
            <div style={{ marginLeft: "40px", marginRight: "40px", height: "500px", overflowY: "scroll"}}>
                {showSavedDrinks()}
            </div>
            <br />
            <br />
            <h2>List of Active Ingredients</h2>
            <h4>Remove An Ingredient By Clicking The  '❌'  Next To It</h4>
            <ul>
                {
                    activeIngredients.map((ingredient, i) => {
                        return (
                        <li key={i}>{ingredient} <span onClick={() => {
                            let idx = activeIngredients.indexOf(ingredient)
                            if (idx > -1) { // only splice array when item is found
                                
                                
                                activeIngredients.splice(idx, 1)
                                let newActiveIngredients = [...activeIngredients]

                                console.log(activeIngredients)
                                updateActiveIngredients(newActiveIngredients); // 2nd parameter means remove one item only
                              }
                        }}>❌</span></li>
                        )
                    })
                
                }
                
            </ul>
            <br />
            <br />
            <h2>Give Your Drink A Name</h2>
            {/* <input type="text" placeholder='Type it here!' onChange={(e) => {
                // console.log(e.target.value)
                setDrinkName(e.target.value)
            }}/> */}
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default" style={{backgroundColor: "grey", color: "whitesmoke"}} >
                Type it here!
                </InputGroup.Text>
                <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => {
                    console.log(e.target.value)
                    setDrinkName(e.target.value)
                }}
                />
            </InputGroup>
            <br />
            <br />
            <br />
            <Button variant="secondary" style={{backgroundColor: "grey", color: "whitesmoke"}} onClick={() => {
                // console.log(activeIngredients)
                saveToCollectionClick()
                window.location.reload(false)
            }}>Save to My Collection!</Button>
        </div>
        )

    
    
    
}

export default CreationStation