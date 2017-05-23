'use strict'

const request = require('supertest')
		, {expect} = require('chai')
		, db = require('../../db/index')
		, User = db.model('user')
		, app = require('../start')
		, agent = request.agent(app)

xdescribe('/api/users', () => {
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

	describe('GET /:id', () => {

		describe('Get a user', () => {
			it('gets a user by id', () => {

			})
		})

		describe('Get user contours per voicing', () => {
			it('retrieves user contours by category', () => {

			})
		})

		describe('Get all user contours', () => {
			it('gets all contours by user', () => {
				
			})
		})

	})

})