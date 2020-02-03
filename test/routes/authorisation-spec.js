process.env.NODE_ENV = 'test'

const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')
const { adminToken } = require('../data')
chai.use(chaiHttp)

describe('Authorisation Tests', function() {
	describe('Incorrect username/password', function() {
		before('Save a user in the database', function(done) {
			mongoose.connection
				.dropCollection('users')
				.catch(err => {
					if (err) {
						done()
					}
				})
				.then(function() {
					let user = {
						username: 'TestUser',
						password: 'Password1$',
						role: 'admin'
					}
					chai
						.request(app)
						.post('/user')
						.set('Authorization', `Bearer ${adminToken}`)
						.send(user)
						.end((err, res) => {
							if (err) {
								done(new Error('User was not created.'))
							} else {
								console.log('User created')
								done()
							}
						})
				})
		})
		it('Should return a custom incorrect username error with 401', function(done) {
			chai
				.request(app)
				.post('/user/authorise')
				.send({
					username: 'WrongUser',
					password: 'Password1$',
					role: 'admin'
				})
				.end((err, res) => {
					if (err) {
						done(new Error('Test fails. Incorrect response recieved'))
					} else {
						expect(res.error).to.exist
						expect(res.body.errorMessage).to.equal(
							'That username does not exist.'
						)
						expect(res.status).to.equal(401)
						done()
					}
				})
		})
		it('Should return a custom incorrect password error with 401', function(done) {
			chai
				.request(app)
				.post('/user/authorise')
				.send({
					username: 'TestUser',
					password: 'Password',
					role: 'admin'
				})
				.end((err, res) => {
					if (err) {
						done(new Error('Test fails. Incorrect response recieved'))
					} else {
						expect(res.error).to.exist
						expect(res.body.errorMessage).to.equal(
							'Please provide a valid password.'
						)
						expect(res.status).to.equal(401)
						done()
					}
				})
		})
	})
	describe('Correct Login details', function() {
		const JWT = require('jsonwebtoken')
		const correctUser = {
			username: 'TestUser',
			password: 'Password1$'
		}
		it('should generate and return a JWT token', function(done) {
			chai
				.request(app)
				.post('/user/authorise')
				.send(correctUser)
				.end((err, res) => {
					if (err) {
						done(err)
					} else {
						expect(res.body.token).to.exist
						done()
					}
				})
		})
		it('The JWT contains role, username, user id in the payload', function(done) {
			chai
				.request(app)
				.post('/user/authorise')
				.send(correctUser)
				.end((err, res) => {
					if (err) {
						done(err)
					} else {
						expect(res.body.token).to.exist
						var decoded = JWT.decode(res.body.token)
						expect(decoded.username).to.exist
						expect(decoded.id).to.exist
						expect(decoded.role).to.exist
						done()
					}
				})
		})
	})
})
