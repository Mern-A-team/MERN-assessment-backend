process.env.NODE_ENV = "test"

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

// Pulling in our server from app
const {app} = require('../app')

// destructure expect assertion from chai
const { expect } = chai

// Our first test simply ensures that our server is connected and returns a
// welcome message from the home api route.
describe('Server', function() {
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

	// it('connects to mongoDB', done => {})
})
