const router = require('express').Router();
const { verifyToken } = require('../../middlewares');

router.get('/', verifyToken, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'RAndos data cant be accesed',
        }
    });
})

module.exports = router;