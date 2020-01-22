// Setting the test environment
process.env.NODE_ENV = 'test'
// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
// destructure expect assertion from chai
const chaiHttp = require('chai-http')
// Instructing chai to use the http module
chai.use(chaiHttp)
// destructuring expect out of chai for use as assertion
const { expect } = chai
// require the mongoose instance from the mongoose connect file.
const { mongoose } = require('../../config/mongoose-connection')
// require the user model
const userModel = require('../../database/schemas/userSchema')
const { app } = require('../../app')

describe('User controller tests', function() {
	before(function(done) {
		mongoose.connection
			.dropCollection('categories')
			.catch(err => {
				if (err) {
					expect(err).to.exist
				}
			})
			.then(done())
	})

	it('should not save a user with an unhashed password', function(done) {
		const bcrypt = require('bcrypt')
		let user = {
			username: 'hashUser',
			password: 'Pass1$',
			role: 'admin'
		}

		chai
			.request(app)
			.post('/user')
			.send(user)
			.end((err, res) => {
				if (err) {
					done(err)
				} else {
					userModel.findOne({ username: 'hashUser' }).then(hashedUser => {
						// note that bcrypt will return false on 2 plain text passwords. It will
						// only return true if comparing to a hash and that hash matches the plain text.
						bcrypt.compare(user.password, hashedUser.password, function(err, res) {
							if (res === true) {
								done()
							} else {
								done(new Error('Password was saved as plain text'))
							}
						})
					})
				}
			})
	})
})
