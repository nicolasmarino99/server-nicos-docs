/* eslint-disable consistent-return */
const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const User = require('../models/User');

router.get('/:id', verifyToken, async (req, res) => {
  console.log(req.params);
  const currentUser = await User.findById(req.params.id);
  try {
    if (!currentUser) return res.status(404).send('user not found');
    res.json(currentUser);
  } catch (error) {
    res.send(error);
  }
});

router.get('/', verifyToken, async (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send('erorr');
    res.json(users);
  });
});

module.exports = router;
