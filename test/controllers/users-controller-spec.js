// Setting the test environment
process.env.NODE_ENV = 'test'
// require the user model
const userModel = require('../../database/schemas/userSchema')
// Destructuring the config variables from the config file
const {app, chaiHttp, chai, expect, mongoose} = require('../test-config')
// instructing chai to use the http module
chai.use(chaiHttp)
// requiring the hardcoded admin token from the admin file
const {adminToken} = require('../data')

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
			.set('Authorization', `Bearer ${adminToken}`)
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
