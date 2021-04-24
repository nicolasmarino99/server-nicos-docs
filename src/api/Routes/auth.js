const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../../validations');
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
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
