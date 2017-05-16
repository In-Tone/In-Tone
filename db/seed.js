'use strict'


// all our models were initialized and assigned as properties on db object, allowing us to destructure here:
const db = require('./index') // in bones it was const db = require('APP/db') (symlink)
const {Target, ToneType, User, UserTone} = db
const {mapValues} = require('lodash');
const Promise = require('bluebird');

function seedEverything() {
	const seeded = {
		toneTypes: toneTypes(),
		users: users()
	}

	// below are for models with belongsTo associations
	seeded.targets = targets(seeded);
	seeded.userTones = userTones(seeded);

	return Promise.props(seeded)

}

const difficulty = ['beginner', 'amatuer', 'intermediate', 'pro', 'master'];

const userTones = seed(UserTone, ({users, toneTypes, Targets}) => ({
	a0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	a9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	b9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	c9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	d9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	e9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	f9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	g9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h0: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h1: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h2: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h3: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h4: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h5: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h6: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h7: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h8: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
	h9: {
		pitches: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
		isBest: false,
		score: Math.floor((Math.random() * 5) + 1),
		difficulty: difficulty[Math.floor(Math.random() * 5)],
		user_id: Math.floor((Math.random() * 4) + 1),
		tone_type_id: Math.floor((Math.random() * 5) + 1),
		target_id: Math.floor((Math.random() * 10) + 1)
	},
}))

const users = seed(User, {
	marc: {
		email: 'marc@test.com',
		password: 'test',
		username: 'marcyMarc',
		rank: 1
	},
	pim: {
		email: 'pim@test.com',
		password: 'test',
		username: 'pimmyPim',
		rank: 1
	},
	edmond: {
		email: 'edmond@test.com',
		password: 'test',
		username: 'eddyEdmond',
		rank: 1
	},
	mike: {
		email: 'mike@test.com',
		password: 'test',
		username: 'mikeyMike',
		rank: 1
	},
})

const toneTypes = seed(ToneType, {
	thaiMid: {
		language: 'thai',
		tone: 'mid'
	},
	thaiLow: {
		language: 'thai',
		tone: 'low'
	},
	thaiFalling: {
		language: 'thai',
		tone: 'falling'
	},
	thaiHigh: {
		language: 'thai',
		tone: 'high'
	},
	thaiRising: {
		language: 'thai',
		tone: 'rising'
	},
})

const targets = seed(Target, ({toneTypes}) =>  ({
	fallingChai: {
		wav: 'https://s3.amazonaws.com/in-tone/Falling-Chai-Yes.wav',
		pitches: [0,0,0,0,91,94,94,94,94,283,286,283,281,281,281,279,279,279,281,281,283,281,281,283,283,285,283,279,276,269,259,245,233,214,197,180,168,159,151,147,140,143],
		duration: 641.587,
		englishTranslation: 'yes',
		transliteration: 'ch\u00CC',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/falling-chai-yet.png',
		tone_type_id: 3
	},
	fallingHai: {
		wav: 'https://s3.amazonaws.com/in-tone/Falling-Hai-Give.wav',
		pitches: [83,87,87,87,87,87,87,87,87,92,281,281,283,281,277,276,276,276,276,277,277,279,279,281,281,277,277,272,271,264,261,255,246,231,208,193,170,155,145,142,142,142],
		duration: 645.029,
		englishTranslation: 'give',
		transliteration: '\u0127\u00EE',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/falling-hai-give.png',
		tone_type_id: 3
	},
	highChai: {
		wav: 'https://s3.amazonaws.com/in-tone/High-Chai-Use.wav',
		pitches: [83,83,88,83,83,83,85,85,89,258,256,255,253,249,245,242,238,236,236,235,233,235,235,235,235,235,236,238,241,249,255,261,266,276,285,292,296,302,304,302,290,136,127,119,90],
		duration: 688.256,
		englishTranslation: 'use',
		transliteration: 'ch\u00CE',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/high-chai-use.png',
		tone_type_id: 4
	},
	highYai: {
		wav: 'https://s3.amazonaws.com/in-tone/High-Yai-Move.wav',
		pitches: [0,219,218,225,244,246,256,122,248,244,242,241,238,237,237,237,238,238,237,236,235,235,236,235,235,233,233,235,236,236,238,240,244,246,251,256,261,269,279,286,296,302,308,311,308,300,292,281,266,255,230,90],
		duration: 788.361,
		englishTranslation: 'move',
		transliteration: '\u0177\u0101y',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/high-yai-move.png',
		tone_type_id: 4
	},
	lowLhai: {
		wav: 'https://s3.amazonaws.com/in-tone/Low-Lhai-Shoulder.wav',
		pitches: [0,226,219,219,218,213,212,204,200,196,193,188,186,184,181,178,174,172,170,168,169,168,168,168,167,165,164,162,159,155,148,145,142,136,139,146,141,82,84,84,168,169,178,186,90,89],
		duration: 695.739,
		englishTranslation: 'shoulder',
		transliteration: 'l\u0300\u0127\u1ECB',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/low-lhai-shoulder.png',
		tone_type_id: 2
	},
	lowMai: {
		wav: 'https://s3.amazonaws.com/in-tone/Low-Mai-New.wav',
		pitches: [0,211,205,206,208,208,106,207,205,204,200,197,195,192,188,185,181,178,174,171,168,166,166,165,165,164,164,164,160,158,155,153,152,153,154,153,151,153,151,155,156,158,163,168],
		duration: 674.849,
		englishTranslation: 'new',
		transliteration: 'm\u0300\u0127I',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/low-mai-new.png',
		tone_type_id: 2
	},
	midKlai: {
		wav: 'https://s3.amazonaws.com/in-tone/Mid-Klai-Far.wav',
		pitches: [0,0,252,245,244,244,238,235,231,228,226,225,222,219,219,217,216,215,214,214,213,211,210,207,205,206,207,207,207,207,206,206,205,202,203,203,204,204,206,209,209,209,206,206,206,206],
		duration: 692.504,
		englishTranslation: 'far',
		transliteration: 'kl\u1ECB',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/mid-klai-far.png',
		tone_type_id: 1
	},
	midPai: {
		wav: 'https://s3.amazonaws.com/in-tone/Mid-Pai-Go.wav',
		pitches: [83,232,231,227,227,226,225,225,225,224,224,224,223,223,221,218,218,215,213,211,210,211,210,210,211,211,211,211,211,212,211,210,211,212,213,215,216,218,218,85],
		duration: 600.686,
		englishTranslation: 'go',
		transliteration: 'p\u1ECB',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/mid-pai-go.png',
		tone_type_id: 1
	},
	risingNhai: {
		wav: 'https://s3.amazonaws.com/in-tone/Rising-Nhai-Where.wav',
		pitches: [0,227,218,217,217,217,218,116,215,211,208,207,202,199,195,192,188,182,88,87,170,171,170,170,170,171,172,173,173,175,178,181,187,193,203,216,231,123,264,286,302,322,339,353,359,359,361,361,361],
		duration: 736.719,
		englishTranslation: 'where',
		transliteration: 'n\u0127\u1ECB',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/rising-nhai-where.png',
		tone_type_id: 5
	},
	risingSai: {
		wav: 'https://s3.amazonaws.com/in-tone/Rising-Sai-Clear.wav',
		pitches: [0,0,0,0,0,0,0,0,0,84,248,237,231,228,227,223,215,105,204,101,197,193,187,185,181,181,182,183,183,185,186,188,188,193,200,212,230,251,269,290,306,322,337,345,353,353,119,119,119,119,119,119,119],
		duration: 796.222,
		englishTranslation: 'clear',
		transliteration: 'sI',
		nativeSpelling: 'https://s3.amazonaws.com/in-tone/rising-sai-clear.png',
		tone_type_id: 5
	}
}))

// module === require.main when this file is run directly from Node.js
if (module === require.main) {
	console.log('first here!')
  db.didSync
    .then(() => db.sync({force: true}))
		.then((data) => {
			console.log('here!')
			return data;
		})
    .then(seedEverything)
		.catch(err => console.error(err))
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {targets})



