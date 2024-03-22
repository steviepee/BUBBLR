const axios = require("axios")

//get list of all drink ingredients from cocktail API
const getAllIngredients = () => {
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
}


module.exports = getAllIngredients