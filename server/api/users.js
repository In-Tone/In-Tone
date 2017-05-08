'use strict'

const router = require('express').Router();
const User = require('../../db/models/User');
const Contour = require('../../db/models/Contour');
const {mustBeLoggedIn} = require('../auth');


router.get('/me', (req, res, next) => {
	res.json(req.user);
});

// send up a users pitch contours for a particular voicing
router.get('/:id/:contour-category'), mustBeLoggedIn, (req, res, next) => {
	Contour.findAll({
		where: {
			user_id: req.params.id,
			category: req.params.contour-category
		}
	})
	.then(userContours => res.send(userContours))
	.catch(next)
}

// send up all of a users pitch contours
router.get('/:id/contours', mustBeLoggedIn, (req, res, next) => {
	Contour.findAll({
		where: {
			user_id: req.params.id
		}
	})
	.then(userContours => res.send(usercontours))
	.catch(next)
})

module.exports = router;