const router = require('express').Router();
const User = require('../../db/models/User');

router.get('/me', (req, res, next) => {
	res.json(req.user);
});

module.exports = router;