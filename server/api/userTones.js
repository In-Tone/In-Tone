'use strict'

const router = require('express').Router();
const userTones = require('../../db/models/userTones');
const {mustBeLoggedIn} = require('../auth');

// store a pitch contour after registering it
// payload received must be an object with {category: 'string', data: [pitchContourData]}
router.post('/userTones', mustBeLoggedIn, (req, res, next) => {
	UserTones.create(req.body)
		.then(userTones => res.status(201).json(userTones))
		.catch(next)
});

module.exports = router;
