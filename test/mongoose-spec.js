process.env.NODE_ENV = "test"

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')


// Tell chai to use the chaiHttp module.
chai.use(chaiHttp)

// Pulling in our server from app
const {app, mongoose} = require('../app')

// destructure expect assertion from chai
const { expect } = chai

describe('Server', function() {
	it('checks mongoose has connected to the test database not development', done => {
		chai
            .request(app)
             expect(mongoose.connection.name === "archivse-test")
			 done()
        })
        
    it("should connect to development database when NODE_ENV is \"!== test\"", done => {
        NODE_ENV = "development"
        chai
          .request(app)
          expect(mongoose.connection.name === "archivise")
          done()
        NODE_ENV = "test"          
    })
     
	})

