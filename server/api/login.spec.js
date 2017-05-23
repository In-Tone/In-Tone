'use strict'

const request = require('supertest')
		, {expect} = require('chai')
		, db = require('../../db/index')
		, User = db.model('user')
		, app = require('../index')
		, agent = request.agent(app)

///////////////
// TEST USER //
///////////////
const testUser = {
  email: 'user@test.com',
  password: 'test123',
}

/////////////////
// LOGIN ROUTE //
/////////////////
describe('/api/login', () => {

	// sync db once before anything else, clear tables after each block
  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  
  /////////////////
  // LOGIN TESTS //
  /////////////////
  xdescribe('POST /login/local (email, password)', () => {
  	// create test user before each it statement
  	beforeEach('create user', () => {
	    User.create({
	      email: testUser.email,
	      password: testUser.password,
	      username: 'tester',
			  rank: '1'
	    })
  	})
  	// test for successful login
    it('succeeds with a valid email and password', () =>
      request(app)
        .post('/api/login/local')
        .send({email: testUser.email, password: testUser.password})
        .expect(302)
    )
    // test for failed login
    it('fails with an invalid email and password', () =>
      request(app)
        .post('/api/login/local')
        .send({email: testUser.email, password: 'wrong'})
        .expect(401)
    )
  })

  ////////////////////
  // WHO AM I TESTS //
  ////////////////////
  describe('GET /whoami', () => {
  	beforeEach('create user', () => {
	    User.create({
	      email: testUser.email,
	      password: testUser.password,
	      username: 'tester',
			  rank: '1'
	    })
  	})
    describe('when not logged in', () =>
      it('responds with an empty object', () =>
        request(app).get('/api/login/whoami')
          .expect(200)
          .then(res => expect(res.body).to.eql({}))
      ))
    describe('when logged in', () => {
      const agent = request.agent(app)
      it('responds with the currently logged in user', () =>
      	agent.post('/api/login/local')
        .send(testUser)
        .then(() => {
	        agent.get('/api/login/whoami')
	          .set('Accept', 'application/json')
	          .expect(200)
	          .then(res => {
	          	expect(res.body).to.contain({
		            email: testUser.email
	          	})
	          })
        })
	    )
  	})
  })

  //////////////////
  // LOGOUT TESTS //
  //////////////////
  describe('POST /logout', () =>
    describe('when logged in', () => {
      const agent = request.agent(app)
      beforeEach('log in', () => 
      	agent.post('/api/login/local')
        .send(testUser))
      
      it('logs you out and redirects to whoami', () => agent
        .post('/api/login/logout')
        .expect(302)
        .expect('Location', '/api/login/whoami')
        .then(() =>
          agent.get('/api/login/whoami')
            .expect(200)
            .then(rsp => expect(rsp.body).eql({}))
        )
      )
    })
  )
})
