process.env.NODE_ENV = 'test'

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

// Pulling in our server from app
const { app } = require('../../app')

// destructure expect assertion from chai
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

describe('User schema Tests', function() {
	before(function() {
		console.log('Connected to', mongoose.connection.name)
	})

	describe('username validation', function() {
		it('should be required', function(done) {
			chai
				.request(app)
				.post('/user/register')
				.send({ username: '', password: 'password1$', role: 'volunteer' })
				.end(function(err, res) {
					expect(err).to.be('Username must be supplied')
					expect(res).to.have.status(422)
				})
			done()
		})
		it('should be a string', function() {
			chai
				.request(app)
				.post('/user/register')
				.send({ username: 465, password: 'password1$', role: 'volunteer' })
				.end(function(err, res) {
					expect(err).to.be('username must be a string of characters')
					expect(res).to.have.status(400)
				})
			done()
		})
		it('should be over more than 3 characters long with no spaces')
	})
	describe('password validation', function() {
		it('should be required')
		it('should be a string')
		it('should be at least 6 characters')
		it('should have at least one number and 1 special character')
	})
	describe('role validation', function() {
		it('should be required')
		it('should be either admin, volunteer or guest')
	})

	// after(function() {
	// 	mongoose.connection.dropDatabase()
	// })
})
