const { User } = require('./index');

User.bulkCreate([
  {
    "googleId": "real googleId",
    "displayName": "real google displayName"
  },
  {
    "googleId": "real googleId",
    "displayName": "Ky P."
  },
  {
    "googleId": "real googleId",
    "displayName": "Patrick Henry"
  },
]);
