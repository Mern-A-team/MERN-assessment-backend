process.env.NODE_ENV = 'test'

// destructuring the config variables from the config file 
const { mongoose, chai, chaiHttp, expect, app } = require('./test-config')

// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

describe('Mongoose connection Tests', function() {
	describe('test vs development database connection', function() {
		it('checks mongoose has connected to the test database not development', function(done) {
			chai.request(app)
			expect(mongoose.connection.name === 'archivse-test')
			done()
		})

		it('should connect to development database when NODE_ENV is "!== test"', function(done) {
			NODE_ENV = 'development'
			chai.request(app)
			expect(mongoose.connection.name === 'archivise')
			done()
			NODE_ENV = 'test'
		})
	})
})
