const express = require('express');

const router = express.Router();

const authRoutes = require('./Routes/auth');
const postsRoutes = require('./Routes/users');

router.use('/user/auth', authRoutes);
router.use('/users', postsRoutes);

module.exports = router;
