process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')
const { app } = require('../../app')


describe('CRUD photo testing', function() {
    before(function(done) {
        mongoose.connection
            .dropCollection('photos')
            .catch(err => {
                if (err) {
                    expect(err).to.exist
                }
            })
            .then(done())
    })

    // Get photo index
    describe('testing routing', function() {
        it('should return a 200', function(done) {
            chai.request(app)
            .get('/photos/test')
            .end(function(err, res){
                if (!err) {
                    expect(res).to.have.status(200)
                    expect(res.body.message).to.equal('Welcome To success')
                    done()
                } else {
                    done(err)
                }
            })
        })
    })

    // Post photo
    describe('should create photo', function(){
        it('should return a 201', function(done) {
            chai.request(app)
            .get('/photos/id')
            .send({
                name: "Portrait of man",
                idNumber: "mmb-189",
                location: "drawer",
                category: ["politician", "military"], 
                description: "blah blah blah",
                fileRef: "present"
            })
            .end(function(err, res){
                expect(res).have.property('name')
                expect(res).have.property('idNumber')
                expect(res).have.property('category')
                expect(res).have.property('location')
                expect(res).have.property('description')
                expect(res).have.status(200)
                done()
            })
        })
    })
// Put photo
// Delete photo
})

// module.exports = Router