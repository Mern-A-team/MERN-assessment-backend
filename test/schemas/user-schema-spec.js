process.env.NODE_ENV = 'test'

const userModel = require('../../database/schemas/userSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Pulling in our server from app
const { app } = require('../../app')

// destructure expect assertion from chai
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

describe('User schema Tests', function() {
	before(async function() {
		console.log(mongoose.connection.name)
		await mongoose.connection.dropCollection('users')
		// userModel.deleteMany({})
	})
	after(async () => {
		await mongoose.connection.dropCollection('users')
	})

	describe('username validation', function() {
		let noUsername = new userModel({
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
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		let notString = new userModel({
			username: 123.5,
			password: 'password1$',
			role: 'volunteer'
		})

		it('should fail if not a string', function(done) {
			notString.save(err => {
				console.log(err)
				// expect(err.name).to.equal('ValidationError')
				done()
			})
		})
		it('should return a custom errror message if not a string')
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

	// after(async function() {

	// })
})
