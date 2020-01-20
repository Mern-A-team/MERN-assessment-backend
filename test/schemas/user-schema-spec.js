process.env.NODE_ENV = 'test'

const userModel = require('../../database/schemas/userSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')

// destructure expect assertion from chai
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

describe('User schema Tests', function() {
	// CLear all database records
	before(async function(done) {
		console.log(mongoose.connection.name)
		await mongoose.connection.dropCollection('users')
		.then(done())
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

		it('should confirm username is a string', async function(done) {
			let userString = {
				username: 'User',
				password: 'password1$',
				role: 'volunteer'
			}

			await userModel
				.create(userString)
				.then(user => {
					expect(user.username).to.be.a('string')
				})
				.catch(err => console.log(err))
				.then(done())
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

	// Clear all test database records
	after(async function(done) {
		await mongoose.connection.dropCollection('users')
		.then(done())
	})
})
