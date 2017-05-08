'use strict'

const router = require('express').Router();
const User = require('../../db/models/User');
const Contour = require('../../db/models/Contour');
const {mustBeLoggedIn} = require('../auth');


router.param('id', (req, res, next) => {
	User.findBy(id)
		.then(foundUser => {
			if (!foundUser) {
				const err = new Error('User not found');
				err.status = 404;
				throw err;
			}
			req.user = foundUser;
			next();
		})
		.catch(next);
})

router.get('/me', (req, res, next) => {
	res.json(req.user);
});

// send up a users pitch contours for a particular voicing
router.get('/:id/:tone'), mustBeLoggedIn, (req, res, next) => {
	Contour.findAll({
		where: {
			user_id: req.params.id,
			category: req.params.tone
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
	.then(userContours => res.send(userContours))
	.catch(next)
})

module.exports = router;
