'use strict';

const db = require('../../db');
const ToneType = db.model('toneType');
const Target = db.model('target');
const router = require('express').Router();

router.get('/:languageName', (req, res, next) => {
			ToneType.findAll({
				where: {
					language: req.params.languageName
				},
				include: [{
					model: Target
				}]
			})
			.then(foundTones => res.json(foundTones))
			.catch(next);
});

module.exports = router;
