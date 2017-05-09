'use strict'

// const db = require('../../db/db');
const db = require('../../db/index.js');
console.log(db)
const User = db.model('user');
const ToneType = db.model('toneType');
const UserTone = db.model('UserTone');
const {mustBeLoggedIn} = require('../auth');

module.exports = require('express').Router()
	.param('username',
		mustBeLoggedIn,
		(req, res, next, username) => 
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
				})
				.catch(next))
	.get('/:username',
		mustBeLoggedIn,
		(req, res, next) => 
			res.json(req.user)
		)
	.post('/:username/:userTone/:toneType',
		mustBeLoggedIn,
		(req, res, next) => 
			UserTone.update(req.body, {
				where: {
					userId: req.user.id,
					toneTypeId: req.params.toneType
				}
			})
				.then(updatedTone => res.json(updatedTone))
				.catch(next));
