const { Sequelize, DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bubblr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
  }
});

User.sync()
  .catch((err) => console.error(err));


const UserFriends = sequelize.define('UserFriends', {
  friend1Id : {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  friend2Id : {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
});

UserFriends.sync()
  .catch((err) => console.error('Failed syncing UserFriends: ', err));

const EstDrinks = sequelize.define('Drink', {
  drinkId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  glass: DataTypes.STRING,
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: DataTypes.STRING,
}
);

EstDrinks.sync()
  .catch((err) => console.error('Failed syncing EstDrinks: ', err));

const EstDrinks_Users_Favorites = sequelize.define('EstDrinks_Users', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  estDrinkId: {
    type: DataTypes.INTEGER,
    references: {
      model: EstDrinks,
      key: 'id',
    },
    allowNull: false,
  },
});

EstDrinks_Users_Favorites.sync()
  .catch((err) => console.error('Failed syncing EstDrinks_Users: ', err));

const Reviews = sequelize.define('Reviews', {
  bubbles: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  message: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Reviews.sync()
  .catch((err) => console.error('Failed syncing Reviews: ', err));

module.exports = {
  User,
  UserFriends,
  EstDrinks,
  EstDrinks_Users_Favorites,
  Reviews,
};
