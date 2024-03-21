import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';


class HomeRandom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomDrink: null
        };
    }

    componentDidMount() {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then((rand) => {
                this.setState({randomDrink: rand.data.drinks[0]})
            })
            .catch((err) => {
                console.error('Error getting drink pick', err);
            })
    }

    render() {
        let { randomDrink } = this.state;
        return (
            <div>
                <h3>Bubblr Random Picks</h3>
                
                <Link to={`/estdrink/${randomDrink && randomDrink.idDrink}`}>

                        <h4>{randomDrink && randomDrink.strDrink}</h4>
                        <img src={randomDrink && randomDrink.strDrinkThumb} style={{ width: '350px', height: '350px'}} />
                </Link>
        
            </div>
        )
    }

}


// function HomeRandom() {
//     return (
//         <h4>Bubblr Picks</h4>
//     )
// }

export default HomeRandom;