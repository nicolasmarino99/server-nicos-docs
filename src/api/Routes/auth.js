const router = require('express').Router();
const { registerValidation } = require('../../validations');
const User = require('../models/User');

// VALIDATIONS



router.post('/register', async (req, res) => {
  // VALIDATE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
