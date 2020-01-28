process.env.NODE_ENV = 'test'

// requiring and destructuring the config variables from the config file.
const { chai, chaiHttp, expect, app } = require('./test-config')

// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

// Our first test simply ensures that our server is connected and returns a
// welcome message from the home api route.
describe('Server Tests', function() {
	it('welcomes user to the api', done => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body.message).to.equals('Welcome To Archivise')
				done()
			})
	})
})
