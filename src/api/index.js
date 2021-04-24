const express = require('express');

const emojisRoutes = require('./Routes/emojis');
const authRoutes = require('./Routes/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojisRoutes);
router.use('/user/auth', authRoutes);

module.exports = router;
