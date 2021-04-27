/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../../validations');
const User = require('../models/User');

// VALIDATIONS

router.post('/register', async (req, res) => {
  // VALIDATE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  // Check duplicates
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ error: 'this email is already chosen' });

  // Encrypt passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create users
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    // create and assign token
    const token = await jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // VALIDATE DATA
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  // Check if user exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send({ error: 'Email or password is wrong' });

  const user = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send({ error: 'Email or password is wrong' });

  // Validate password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: 'Email or password is wrong' });

  // create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
