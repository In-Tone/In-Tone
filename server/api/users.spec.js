'use strict'

const request = require('supertest')
		, {expect} = require('chai')
		, db = require('../../db/db')
		, User = db.model('user')
		, app = require('../start')
		, agent = request.agent(app)

describe('/api/users', () => {
	before('Await database sync', () => {
		return db.didSync
		.then(() => {
			User.create({
				email: 'test@user.net',
				password: 'password',
				username: 'Test User'
			})
			.then(() => {
				console.log('test user created')
			})
		})
	})
	afterEach('Clear the tables', () => db.truncate({ cascade: true}))

	// GET requests for users
	describe('GET /:username', () => {

		describe('Get a user', () => {
			it('gets a user by id', () => {
				
			})
		})

		describe('Include all user associations', () => {
			it('retrieves user contours by category', () => {

			})
		})

	})

	// GET requests for usertones 
	describe('GET /usertones', () => {

		describe('Get the best tones for a user', () => {
			it('finds all the best results for a user', () => {

			})
		})

	})

	// POST requests for usertones
	describe('POST /usertones', () => {

	})

})