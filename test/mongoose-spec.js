process.env.NODE_ENV = 'test'

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

// Pulling in our server from app
const { app } = require('../app')
const { mongoose } = require('../config/mongoose-connection')

// destructure expect assertion from chai
const { expect } = chai

describe('Mongoose connection Tests', function() {
	describe('test vs development database connection', function() {
		it('checks mongoose has connected to the test database not development', function(done) {
			chai.request(app)
			expect(mongoose.connection.name === 'archivse-test')
			done()
		})

		it('should connect to development database when NODE_ENV is "!== test"', function(done) {
			NODE_ENV = 'development'
			chai.request(app)
			expect(mongoose.connection.name === 'archivise')
			done()
			NODE_ENV = 'test'
		})
	})
	describe('User schema Tests', function() {
		describe('username validation', function() {
			it('should be required')
			it('should be a string')
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
	})
})
