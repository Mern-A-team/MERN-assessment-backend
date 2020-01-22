process.env.NODE_ENV = 'test'

const exress = require('express')
const Router = express.Router()

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')
const { photos } = require('../controllers/photos-controller-spec')



// Get photo index
describe('shows a gallery of all photos', funciton(done))
    it('should go to /photos', function() {
        chai.request(server)
        .get('/photos')
        .end(function(err, res){
            res.should.have.status(200)
            done()
        })
    })

// Post photo
describe('should return one photo', function(done){
    it('should go to /photos/id', function() {
        chai.request(server)
        .get('/photos/id')
        .end(function(err, res){
            res.should.have.property('name')
            res.should.have.property('idNumber')
            res.should.have.property('category')
            res.should.have.property('location')
            res.should.have.property('description')
            res.should.have.status(200)
            done()
        })
    })
})
// Put photo
// Delete photo

module.exports = Router