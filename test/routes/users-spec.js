// Setting the test environment
process.env.NODE_ENV = 'test'
// destructuring the config variables from the config file
const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')
// Instructing chai to use the http module
chai.use(chaiHttp)

describe('Route CRUD Testing', function() {
	// Clear all database records
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
				.send({
					username: 'TestChicken',
					password: 'Llama1$',
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
	})
})
