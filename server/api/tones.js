'use strict'

const router = require('express').Router();
const UserTone = require('../../db/models/userTone');
const {mustBeLoggedIn} = require('../auth');

// store a pitch contour after registering it
// payload received must be an object with {category: 'string', data: [pitchContourData]}
router.post('/contour', mustBeLoggedIn, (req, res, next) => {
	UserTone.create(req.body)
		.then(userTone => res.status(201).json(userTone))
		.catch(next)
});
