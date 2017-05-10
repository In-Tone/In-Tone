'use strict'

// const db = require('../../db/db');
const db = require('../../db/index.js');
const User = db.model('user');
const ToneType = db.model('toneType');
const UserTone = db.model('UserTone');
const {mustBeLoggedIn} = require('../auth');
const router = require('express').Router();

router.param('username',(req, res, next, username) => {
	User.findOne({
		where: { username: username },
		include: [{ all: true }]
	})
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
});

router.get('/:username', (req, res, next) => {
	res.send(req.user);
});

router.post('/:username/:toneType', (req, res, next) => {
	UserTone.findOne({
		where: {
			user_id: req.user.id,
			tone_type_id: req.params.toneType
		}
	})
		.then(userTone => {
			if (!userTone) {
				return res.sendStatus(404);
			} else {
				return userTone.update(req.body);
			}
		})
		.then(updatedUserTone => {
			res.send(updatedUserTone);
		})
		.catch(next)

})

module.exports = router;
