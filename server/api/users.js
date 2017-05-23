'use strict'

// const db = require('../../db/db');
const db = require('../../db/index.js');
const User = db.model('user');
const ToneType = db.model('toneType');
const UserTone = db.model('UserTone');
const {mustBeLoggedIn} = require('../auth');
const router = require('express').Router();

router.get('/usertones/:userId', (req, res, next) => {
	UserTone.findAll({ 
		where: { 
			user_id: req.params.userId 
		},
		include: [ { all: true } ] 
	})
		.then(foundTones => res.send(foundTones))
		.catch(next);
})

router.get('/usertones/:userId/best', (req, res, next) => {
	UserTone.findAll({
		where: {
			user_id: req.params.userId,
			isBest: true
		}
	})
		.then(foundTones => res.send(foundTones))
		.catch(next);
})

router.post('/usertones/:userId/:targetId/:bool', (req, res, next) => {
	if (req.params.bool) {
		UserTone.findOne({
			where: {
				user_id: req.params.userId,
				target_id: req.params.targetId,
				isBest: req.params.bool
			},
			include: [ { model: ToneType, required: true } ],
		})
			.then(foundTone => foundTone && foundTone.update({ isBest: false }))
			.catch(next);
	}
	UserTone.create(req.body)
		.then(() => {
			console.log(req.body);
			UserTone.findAll({ where: { user_id: req.params.userId } })
				.then(foundTones => res.send(foundTones))
				.catch(next);
		})
		.catch(next);
});

module.exports = router;
