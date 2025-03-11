const { MatchGame } = require('./index');
const matchGames = [
  {
    userId: 1,
    drinkId: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29Lepz2ldNXdJ54AQzfisezkgxvwYJbzddw&s",
  },
  {
    userId: 1,
    drinkId: 2,
    imageUrl: "https://img.freepik.com/free-psd/refreshing-iced-tea-tall-glass-summer_191095-84730.jpg",
  },
  {
    userId: 2,
    drinkId: 3,
    imageUrl: "https://images.creativefabrica.com/products/previews/2023/10/27/A6LvDbDM3/2XLKT0cyPbGEVtnNawEdFwocYTB-mobile.jpg",
  },
  {
    userId: 2,
    drinkId: 4,
    imageUrl: "https://img.freepik.com/free-psd/refreshing-mojito-cocktail-glass-with-lemon-ice-cubes-transparent-background_84443-26917.jpg",
  },
  {
    userId: 3,
    drinkId: 1,
    imageUrl:"https:imgfreepikcomfree-psdrefreshing-iced-tea-drink-with-mint-garnish-two-straws-tall-glass_632498-52446.jpg",
  },
  {
    userId: 3,
    drinkId: 4,
    imageUrl: "https://img.freepik.com/free-psd/refreshing-lemon-margarita-cocktail_632498-25189.jpg",
  },
];

const seedMatchGames = async () => {
  try {
    await MatchGame.bulkCreate(matchGames);
    console.log('MatchGame data seeded successfully!');
  } catch (err) {
    console.error('Failed to seed MatchGame data:', err);
  }
};

seedMatchGames();