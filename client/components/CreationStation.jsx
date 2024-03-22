import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
    // getAllIngredients()

    function getAllIngredients() {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((results) => {
            // console.log(results.data.drinks)
            let storage = []
            results.data.drinks.forEach((drink) => {
                storage.push(drink['strIngredient1'])
            })
            // console.log(storage)
            // updateIngredients(newIngredients => [...newIngredients, storage])
            updateIngredients(storage)
        })
        // console.log('orange')
    }

    // // function newIngredientsClick() {
    //     axios.post('/api/customDrinks', {
    //         name: 'Kylan',
    //         last: 'Patton'
    //     })
    //     .then(() => {
    //         console.log('post was successful')
    //     })
        
    // // }

    function saveToCollectionClick() {
        axios.post('/api/customDrinks', {
            drinkName: drinkName,
            drinkIngredients: JSON.stringify(activeIngredients)
        })
        .then(() => {
            console.log('custom drink post was successful')
        })
        .catch((err) => {
            console.error(err)
        })
        // axios.post('/api/customDrinks', {
        //     name: 'Kylan',
        //     last: 'Patton'
        // })
        // .then(() => {
        //     console.log('post was successful')
        // })
    }

    useEffect(() => {
        getAllIngredients()
        // newIngredientsClick()
    })
        return (
        <div>
            <h1>Create A Drink</h1>
            <br />
            <br />
            <button>New Ingredients</button>
            {' '}
            <button >My Saved Recipes</button>
            <br />
            <br />
            <div style={{backgroundColor: "blue", height: "500px", overflowY: "scroll"}}>
                {newIngredients.map((ingredient, i) => {
                   return ( <div style={{backgroundColor: "lightblue", marginBottom: "10px"}} key={i}>
                        {ingredient} <span onClick={() => {
                            activeIngredients.push(ingredient)
                            // console.log(newArr)
                            updateActiveIngredients(activeIngredients)
                        }}>➕</span> 
                    </div>
                   )
                })}
            </div>
            <br />
            <br />
            <h2>List of Active Ingredients</h2>
            <h4>Remove An Ingredient By Clicking The  '❌'  Next To It</h4>
            <ul>
                {
                    activeIngredients.map((ingredient, i) => {
                        return (
                        <li key={i}>{ingredient} <span>❌</span></li>
                        )
                    })
                
                }
                
            </ul>
            <br />
            <br />
            <h2>Give Your Drink A Name</h2>
            <input type="text" placeholder='Type it here!' onChange={(e) => {
                // console.log(e.target.value)
                setDrinkName(e.target.value)
            }}/>
            <br />
            <br />
            <br />
            <button onClick={() => {
                saveToCollectionClick()
            }}>Save to My Collection!</button>
        </div>
        )

    
    
    
}

export default CreationStation