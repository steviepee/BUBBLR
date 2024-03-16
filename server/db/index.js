const { Sequelize, DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bubblr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
test();

const User = sequelize.define('User', {
  // Model attributes are defined here
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync()
  .catch((err) => console.error(err));

// (async () => {
//   const jane = await User.create({ name: 'Jane' });
//   // Jane exists in the database now!
//   console.log(jane instanceof User); // true
//   console.log(jane.name); // "Jane"
// });
console.log(User === sequelize.models.User); // true

module.exports = {
  User,
};
