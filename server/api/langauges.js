'use strict';

const db = require('../../db');
const ToneType = db.model('userTone');
const Target = db.model('target');

module.exports = require('express').Router()
	.get('/:langaugeName',
		(req, res, next) => 
			ToneType.findAll({
				where: {
					language: req.params.languageName
				},
				include: [{
					model: Target
				}]
			})
			.then(foundTones => res.json(foundTones))
			.catch(next));