'use strict'

// const db = require('../../db/db');
const db = require('../../db/index.js');
const User = db.model('user');
const ToneType = db.model('toneType');
const UserTone = db.model('UserTone');
const {mustBeLoggedIn} = require('../auth');
const router = require('express').Router();

router.get('/:username', (req, res, next) => {
	User.findOne({
		where: { username: req.params.username },
		include: [{ all: true }]
	})
		.then(foundUser => {
			if (!foundUser) {
				const err = new Error('User not found');
				err.status = 404;
				throw err;
			}
			res.send(foundUser);
		})
		.catch(next);
});

router.get('/usertones/:userId', (req, res, next) => {
	UserTone.findAll({ where: { user_id: req.params.userId } })
		.then(foundTones => res.send(foundTones))
		.catch(next);
})

// this route posts a new attempt in the database; 
// *IF* the user's current attempt is better than any previous attempt for the specified tone, then the column _isBest_ will be marked "true" and the previous row for which the column _isBest_ was marked "true" will now be marked "false" and the wavblob will be cleared from the database; hence the initial if statement;
// *THEN* a new row will be created; if the user's currernt attempt is better than any previous attempt, a new wav file will be stored to the database; if not, then the column _wavblob_ will remain empty(=null).
router.post('/usertones/:userId/:targetId/:bool', (req, res, next) => {
	if (req.params.bool) {
		UserTone.findOne({
			where: {
				user_id: req.params.userId,
				target_id: req.params.targetId,
				isBest: req.params.bool
			}
		})
			.then(foundTone => foundTone && foundTone.update({ wavblob: null, isBest: false }))
			.catch(next);
	}
	UserTone.create(req.body)
		.then(() => {
			UserTone.findAll({ where: { user_id: req.params.userId } })
				.then(foundTones => res.send(foundTones))
				.catch(next);
		})
		.catch(next);
});

//^^^^^^^^^^^ REFACTOR: to avoid possible (and perhaps not problematic) race conditions, turn the two Sequelize things into middleware functions that we can call req.res.next or whatever.

module.exports = router;
