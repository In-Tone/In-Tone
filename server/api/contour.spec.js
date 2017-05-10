'use strict'

const request = require('supertest')
		, {expect} = require('chai')
		, db = require('../../db/db')
		, User = db.model('user')
		, app = require('../start')
		, agent = request.agent(app)

describe('/api/items', () => {
	before('Await database sync', () => {
		return db.didSync
		.then(() => {
			// creates a new user just to pass the validation specs for contours
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

	describe('POST /:id', () => {

		describe('Add a new contour', () => {
			it('adds a new item AND properly associates it to user', () => {
				
			})

		})

	})

})