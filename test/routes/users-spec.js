// Setting the test environment
process.env.NODE_ENV = 'test'
// destructuring the config variables from the config file
const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')
// requiring bcrypt for password hashing in test
const bcrypt = require('bcrypt')
// Instructing chai to use the http module
chai.use(chaiHttp)
// requiring the user model to create a user instance bypassing route requirements for a test
const userModel = require('../../database/schemas/userSchema')
// requiring the amdmin JWT token from the data file
const { adminToken, createUser, volunteerToken } = require('../data')

describe('Route CRUD Testing', function() {
	// Clear all database records
	before(function(done) {
		mongoose.connection
			.dropCollection('users')
			.catch(err => {
				if (err) {
					expect(err).to.exist
				}
			})
			.then(createUser())
			.then(done())
	})

	it('Test route', function(done) {
		chai
			.request(app)
			.get('/user/test')
			.end((err, res) => {
				if (!err) {
					// Please note that i am a teapot.
					expect(res).to.have.status(418)
					expect(res.body.message).to.equal('User route test Success')
					done()
				} else {
					done(err)
				}
			})
	})

	describe('Create user', function() {
		it('Should return a 201 if successful with custom message', function(done) {
			chai
				.request(app)
				.post('/user')
				.set('Authorization', `Bearer ${adminToken}`)
				.send({
					username: 'admin',
					password: 'admin1$',
					role: 'admin'
				})
				.end((err, res) => {
					if (err) {
						done(err)
					} else {
						expect(res).to.have.status(201)
						expect(res.body).to.equal('User successfully created!')
						done()
					}
				})
		})
		it('should return a 400 & custom message if invalid details are entered ', function(done) {
			chai
				.request(app)
				.post('/user')
				.set('Authorization', `Bearer ${adminToken}`)
				.send({
					username: '',
					password: 'Test1$',
					role: 'admin'
				})
				.end((err, res) => {
					if (err) {
						done(err)
						// done()
					} else {
						expect(res).to.have.status(400)
						expect(res.body).to.equal('The username field is required!')
						done()
					}
				})
		})
		it('should return a 401 if not admin role', function(done) {
			bcrypt.hash('Llama1$', 10, (err, hash) => {
				if (err) {
					done(err)
				} else {
					userModel
						.create({
							username: 'TestWombat',
							password: hash,
							role: 'volunteer'
						})
						.then(res => {
							console.log('user created')
							chai
								.request(app)
								.post('/user/authorise')
								.send({
									username: 'TestWombat',
									password: 'Llama1$',
									role: 'volunteer'
								})
								.end((err, res) => {
									if (err) {
										done(err)
									} else {
										chai
											.request(app)
											.post('/user')
											.set('Authorization', `Bearer ${res.body.token}`)
											.send({
												username: 'DontCreate',
												password: hash,
												role: 'Volunteer'
											})
											.end((err, res) => {
												if (err) {
													done(err)
												} else {
													expect(res.status).to.equal(401)
													expect(res.body.errorMessage).to.equal(
														'Permission denied. Admin task only!'
													)
													done()
												}
											})
									}
								})
						})
				}
			})
		})
	})
	describe('Edit User', function() {
		it('Should not update unless admin role is in token returning 401', function(done) {
			//    user is created with a role of Guest
			userModel.findOne({ username: 'EditUser' }).then(user => {
				chai
					.request(app)
					.put(`/user/${user._id}`)
					.set('Authorization', `Bearer ${volunteerToken}`)
					.send({
						role: 'volunteer'
					})
					.end((err, res) => {
						if (err) {
							done(err)
						} else {
							expect(res.status).to.equal(401)
							expect(res.body.errorMessage).to.equal(
								'Permission denied. Admin task only!'
							)
							done()
						}
					})
			})
		})
		it('Should return a 200 when updated', function(done) {
			//    user is created with a role of Guest
			userModel
				.findOne({ username: 'EditUser' })
				.then(user => {
					chai
						.request(app)
						.put(`/user/${user._id}`)
						.set('Authorization', `Bearer ${adminToken}`)
						.send({
							role: 'volunteer',
							password: 'Another1$'
						})
						.end((err, res) => {
							if (err) {
								done(err)
							} else {
								userModel.findOne({ username: 'EditUser' }).then(user => {
									expect(user.role).to.equal('volunteer')
								})
								expect(res.body.message).to.equal(
									'User details successfully updated!'
								)
								done()
							}
						})
				})
				.catch(err => done(err))
		})
	})
	describe('Get users', function() {
		it('should return all users at get request to /user route giving status 200!', function(done) {
			chai
				.request(app)
				.get('/user')
				.set('Authorization', `Bearer ${adminToken}`)
				.end((err, res) => {
					if (err) {
						done(err)
					} else {
						let expectedLength = res.body.users.length
						userModel.find().then(users => {
							expect(res.status).to.equal(200)
							expect(users.length).to.equal(expectedLength)
							done()
						})
					}
				})
		})
	})

	describe('User delete route', function() {
		it('Should not delete unless admin role is in token returning 401', function(done) {
			//    user is created with a role of Guest
			userModel.findOne({ username: 'EditUser' }).then(user => {
				chai
					.request(app)
					.delete(`/user/${user._id}`)
					.set('Authorization', `Bearer ${volunteerToken}`)
					.end((err, res) => {
						if (err) {
							done(err)
						} else {
							expect(res.status).to.equal(401)
							expect(res.body.errorMessage).to.equal(
								'Permission denied. Admin task only!'
							)
							done()
						}
					})
			})
		})
		it('Should return a 200 and success message when complete', function(done) {
			userModel.findOne({ username: 'EditUser' }).then(user => {
				chai
					.request(app)
					.delete(`/user/${user._id}`)
					.set('Authorization', `Bearer ${adminToken}`)
					.end((err, res) => {
						if (err) {
							done(err)
						} else {
							expect(res.status).to.equal(200)
							expect(res.body.message).to.equal('User has been removed.')
							done()
						}
					})
			})
		})
	})
})
