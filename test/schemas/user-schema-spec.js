// Setting the test environment
process.env.NODE_ENV = 'test'
// requiring the userModel form the userSchema file
const userModel = require('../../database/schemas/userSchema')
// destructuring the config variables fromt he config file
const { mongoose, expect } = require('../test-config')

// Clear all database records
before(async function(done) {
	await mongoose.connection
		.dropCollection('users')
		.catch(err => console.log(err))
		.then(done())
})

// USER SCHEMA TESTS

describe('User schema Tests', function() {
	// USERNAME VALIDATION!!

	describe('username validation', function() {
		let noUsername = new userModel({
			username: '',
			password: 'password1$',
			role: 'volunteer'
		})

		it('should return a custom error message', function(done) {
			noUsername.save(err => {
				if (err) {
					let error = err.errors.username.message
					expect(error).to.equal('The username field is required!')
					done()
				} else {
					done(new Error('No error thrown test fails!'))
				}
			})
		})

		it('should be required', function(done) {
			noUsername.save(err => {
				if (err) {
					expect(err.name).to.equal('ValidationError')
					done()
				} else {
					done(new Error('No error thrown, test fails!'))
				}
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
				password: 'passwd1$',
				role: 'admin'
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
		it('Should be unique', function(done) {
			let userOne = new userModel({
				username: 'spaceuser',
				password: 'password1$',
				role: 'volunteer'
			})
			userOne.save(function(err) {
				if (err) {
					done(err)
				}
				let dupUser = new userModel({
					username: 'spaceuser',
					password: 'password1$',
					role: 'volunteer'
				})

				dupUser.save(function(err) {
					expect(err).to.exist
					expect(err.name).to.equal('ValidationError')
					expect(err.errors.username.message).to.equal(
						'Im sorry! that username is taken.'
					)
					done()
				})
			})
		})
	})

	// PASSWORD VALIDATION!!

	describe('password validation', function() {
		const noPassword = new userModel({
			username: 'UserBob',
			password: '',
			role: 'volunteer'
		})

		it('should be required', function(done) {
			noPassword.save(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
		it('should return a custom error message', function(done) {
			noPassword.save(err => {
				let error = err.errors.password.message
				expect(error).to.equal('The password field is required!')
				done()
			})
		})
		it('should be at least 6 characters', function(done) {
			const shortPassword = new userModel({
				username: 'testUser',
				password: '1$sht',
				role: 'volunteer'
			})

			shortPassword.validate(function(err) {
				expect(err).to.exist
				expect(err.name).equal('ValidationError')
				expect(err.errors.password.message).to.equal(
					'Your password must have 6 characters including a special character and a number.'
				)

				done()
			})
		})
		it('should have at least one number and 1 special character', function(done) {
			const badPassword = new userModel({
				username: 'testUser',
				password: 'password',
				role: 'volunteer'
			})

			badPassword.validate(function(err) {
				expect(err).to.exist
				expect(err.name).equal('ValidationError')
				expect(err.errors.password.message).to.equal(
					'Your password must have 6 characters including a special character and a number.'
				)

				done()
			})
		})
	})

	// ROLE VALIDATIONS!!

	describe('role validation', function() {
		it('should be required', function(done) {
			const noRole = new userModel({
				username: 'testUser',
				password: '1$sht',
				role: ''
			})

			noRole.save(function(err) {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
		it('should be either admin, volunteer or guest', function(done) {
			const incorrectRole = new userModel({
				username: 'testUser',
				password: '1$sht',
				role: 'researcher'
			})

			incorrectRole.validate(function(err) {
				expect(err).to.exist
				expect(err.name).equal('ValidationError')
				done()
			})
		})
	})
})
