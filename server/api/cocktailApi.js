const axios = require("axios")

//get list of all drink ingredients from cocktail API
const getAllIngredients = () => {
 axios.get('www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
}


module.exports = getAllIngredients