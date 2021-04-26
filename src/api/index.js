const express = require('express');

const emojisRoutes = require('./Routes/emojis');
const authRoutes = require('./Routes/auth');
const postsRoutes = require('./Routes/posts');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojisRoutes);
router.use('/user/auth', authRoutes);
router.use('/posts', postsRoutes);


module.exports = router;
