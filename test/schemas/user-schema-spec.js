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
				.catch(err => console.log(err.name).to.equal('ValidationError'))
				.then(done())
		})
		it('should be over 3 characters long with no spaces', async function(done) {
			let shortUser = {
				username: 'Usd',
				password: 'password1$',
				role: 'volunteer'
			}
			 

			// I need some fucking help with this shit im over it!
			expect(function() {
				userModel.create(shortUser)
				.catch(err => console.log(err))
			}).to.throw()
			
			done()
			
		})
		it(
			'should return a custom errror message if username is not over 3 characters no spaces'
		)
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
