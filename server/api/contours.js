'use strict'

const router = require('express').Router();
const Contour = require('../../db/models/Contour');
const {mustBeLoggedIn} = require('../auth');

// store a pitch contour after registering it
// payload received must be an object with {category: 'string', data: [pitchContourData]}
router.post('/contour', mustBeLoggedIn, (req, res, next) => {
	Contour.create(req.body)
	.then(contour => res.status(201).json(contour))
	.catch(next)
});
