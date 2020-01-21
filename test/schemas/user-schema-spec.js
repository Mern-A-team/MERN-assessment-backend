// Setting the test environment
process.env.NODE_ENV = 'test'
// requiring the userModel form the userSchema file
const userModel = require('../../database/schemas/userSchema')
// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
// destructure expect assertion from chai
const { expect } = chai
// require the mongoose instance from the mongoose connect file.
const { mongoose } = require('../../config/mongoose-connection')

// Clear all database records
before(async function(done) {
	await mongoose.connection
		.dropCollection('users')
		.catch(err => console.log(err))
		.then(done())
})

// USER SCHEMA TESTS

describe('User schema Tests', function() {
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
				.catch(err => expect(err.name).to.equal('ValidationError'))
				.then(done())
		})

		let shortUser = {
			username: 'Us',
			password: 'password1$',
			role: 'volunteer'
		}

		it('should be over 3 characters long', function(done) {
			userModel.create(shortUser).catch(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
		it('should return a custom errror message if not over 3 characters', function(done) {
			userModel.create(shortUser).catch(err => {
				expect(err).to.exist
				expect(err.errors.username.message).to.equal(
					'The username must contain 3 or more characters.'
				)
				done()
			})
		})
		it('should not contain spaces & return a custom message', function(done) {
			let spacedUser = {
				username: 'space user',
				password: 'password1$',
				role: 'volunteer'
			}
			userModel.create(spacedUser).catch(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				expect(err.errors.username.message).to.equal(
					'Please remove any whitespace form your username.'
				)

				done()
			})
		})
		it('Should be unique', async function(done) {
			if (mongoose.connection.collection('users')) {
				await mongoose.connection
					.dropCollection('users')
					.catch(err => console.log(err))
					.then(console.log('success database droped before test'))
			}

			let userOne = {
				username: 'spaceuser',
				password: 'password1$',
				role: 'volunteer'
			}
			let dupUser = {
				username: 'spaceuser',
				password: 'password1$',
				role: 'volunteer'
			}

			await userModel
				.create(userOne)
				.catch(err => console.log(err, 'USER ONE SAVE FAILED!'))

			userModel.create(dupUser).catch(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				expect(err.errors.username.message).to.equal(
					'Im sorry! that username is taken.'
				)
				done()
			})
		})
	})
	describe('password validation', function() {
		it('should be required')
		it('should be a Hash')
		it('should be at least 6 characters')
		it('should have at least one number and 1 special character')
	})
	describe('role validation', function() {
		it('should be required')
		it('should be either admin, volunteer or guest')
	})
})
