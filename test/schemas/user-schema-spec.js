process.env.NODE_ENV = 'test'

const userSchema = require('../../database/schemas/userSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Pulling in our server from app
const { app } = require('../../app')

// destructure expect assertion from chai
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

describe('User schema Tests', function() {
	before(function() {
		console.log(mongoose.connection.name)
	})

	describe('username validation', function() {
		let noUsername = new userSchema({
			username: '',
			password: 'password1$',
			role: 'volunteer'
		})

		it('should return a custom error message', function(done) {
			noUsername.save(err => {
				let error = err.errors.username.message
				expect(error).to.equal('The username field is required!')
				done()
			})
		})

		it('should be required', function(done) {
			noUsername.save(err => {
				expect(err)
				done()
			})
		})
		// it('should be a string', function(done) {
		// 	done()
		// })
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
