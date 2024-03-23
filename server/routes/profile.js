const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const { UserFriends, User, customDrinks } = require('../db/index');

// this grabs a users friends when opening profile, not able to do in one query...
router.get('/friends/:id', (req, res) => {
  const { id } = req.params;
  UserFriends.findAll({
    attributes: ['friend2Id'],
    where: { friend1Id: id },
    raw: true,
  })
    .then((arrFriend2IdObj) => {
      if (arrFriend2IdObj) {
        const userIdArr = [];
        for (let i = 0; i < arrFriend2IdObj.length; i++) {
          userIdArr.push({ id: arrFriend2IdObj[i].friend2Id });
        }
        return User.findAll({ where: { [Op.or]: userIdArr }, raw: true });
      }
    })
    .then((userArr) => {
      res.send(userArr);
    })
    .catch((err) => {
      console.error('Failed finding friends: ', err);
      res.sendStatus(500);
    });
});

// for user search
router.get('/users/:displayName', (req, res) => {
  const { displayName } = req.params;
  User.findAll({
    where: { displayName: { [Op.substring]: displayName } },
    limit: 10,
  })
    .then((userArr) => {
      res.send(userArr);
    })
    .catch((err) => {
      console.error('failed search for user by name: ', err);
      res.sendStatus(500);
    });
});

// for user follow
router.post('/follow', (req, res) => {
  // represents the user ids in db
  const { id, idFollow } = req.body;
  // currently is creating even if exists - doesn't seem to affect anything though
  UserFriends.create({ friend1Id: id, friend2Id: idFollow })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error('failed following: ', err);
      res.sendStatus(500);
    });
});

router.delete('/unfollow', (req, res) => {
  const { friend1Id, friend2Id } = req.body;
  UserFriends.destroy({ where: { friend1Id, friend2Id } })
    .then(() => res.sendStatus(200))
    .catch((err) => console.error('failed to unfollow user: ', err));
});

router.get('/concoctions', (req, res) => {
  // this will need to change to a specific users concoctions
  customDrinks.findAll({})
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error('failed getting concoctions: ', err);
      res.sendStatus(500);
    });
});

router.patch('/updateConcoction', (req, res) => {
  const { id, drinkName, drinkIngredients } = req.body;
  customDrinks.update({ drinkName, drinkIngredients }, { where: { id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('failed updating concoction', err);
      res.sendStatus(500);
    });
});

router.delete('/removeConcoction/:id', (req, res) => {
  const { id } = req.params;
  customDrinks.destroy({ where: { id } })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error('failed deleting concoction: ', err);
      res.sendStatus(500);
    });
});

// for getting user info from db
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((userObj) => {
      res.send(userObj);
    })
    .catch((err) => {
      console.error('failed finding user by pk: ', err);
      res.send(500);
    });
});

module.exports = router;
