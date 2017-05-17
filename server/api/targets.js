'use strict';

const db = require('../../db');
const ToneType = db.model('toneType');
const Target = db.model('target');
const router = require('express').Router();

router.get('/:languageName/tonetypes', (req, res, next) => {
	ToneType.findAll({
		where: {
			language: req.params.languageName
		}
	})
		.then(toneTypes => res.json(toneTypes))
});

// load all targets by tone type for given language
router.get('/:languageName', (req, res, next) => {
	ToneType.findAll({
		where: {
			language: req.params.languageName
		},
		include: [{
			model: Target
		}]
	})
	.then(foundTones => {
		res.json(foundTones)
	})
	.catch(next);
});

// post new target -- admin
router.post('/', (req, res, next) => {
	Target.create({
		wav: req.body.wav,
		pitches: req.body.pitches,
		englishTranslation: req.body.englishTranslation,
		transliteration: req.body.transliteration,
		thaiSpelling: req.body.thaiSpelling,
		tone_type_id: req.body.toneTypeId
	})
	.then(newTarget => {
		res.send(newTarget);
	})
	.catch(next);
});

module.exports = router;
