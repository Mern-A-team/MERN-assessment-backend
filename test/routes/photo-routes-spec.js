process.env.NODE_ENV = 'test'

const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')

chai.use(chaiHttp)

// const app = require('../../app')
// const { expect } = chai
// const { mongoose } = require('../../config/mongoose-connection')
const photoModel = require('../../database/schemas/photoSchema')
const { createPhoto, volunteerToken, adminToken } = require('../data')

describe('Photo CRUD testing', function() {

    before(function(done) {
        mongoose.connection
            .dropCollection('photos')
            .catch(err => {
                if (err) {
                    expect(err).to.exist
                }
            })
            .then(createPhoto())
            .then(done())
    })

    it("Test route", function(done) {
        chai
            .request(app)
            .get('/photos/test')
            .end((err, res) => {
                if (!err) {
                    expect(res).to.have.status(200)
                    expect(res.body.message).to.equal("Success")
                    done()
                } else {
                    done(err)
                }
            })
    })

    it("should go to a gallery of images", function(done) {
        chai
            .request(app)
            .get('/photos')
            .end((err, res) => {
                if (!err) {
                    expect(res).to.have.status(200)
                } else {
                    done(err)
                }
            })
        done()

    })
  
    describe('Create photo', function () {
        it('Should return a 201 if successful', function(done) {
            chai
                .request(app)
                .post('/photos/addPhoto')
                .set('Authorization', `Bearer ${volunteerToken}`)
                .send({
                    name: 'Test Passes',
                    idNumber: "mmb-whatever",
                    location: "File cabinet",
                    category: ["array", "of", "subjects"],
                    description: "Blah blah",
                    fileRef: "id string"
                })
                .end((err, res) => {
                    if (err) {
                        done(err)
                    } else {
                        expect(res).to.have.status(201)
                        expect(res.body).to.equal('Photo successfully saved!')
                    }
                })
                done()
            })
        })

    describe ('Editing a Photo', function() {
        it('should update the details of a photo', function() {
            photoModel
                .findOne({ name: 'testPhoto1' })
                .then(photo => {
            chai
                .request(app)
                .put(`/photos/${photo._id}`)
                .set('Authorization', `Bearer ${volunteerToken}`)
                .send({
                    name: 'Test Passes',
                    idNumber: "mmb-29837",
                    location: "File cabinet",
                    category: ["array", "of", "subjects"],
                    description: "Blah blah",
                    fileRef: "id string"
                })
                .end((err, res) => {
                    if(err) {
                        done(err)
                    } else {
                        expect(res.status).to.equal(200)
                        console.log(res)
                    }
                })
            })
        })
    })
})


// if an array is [] empty, add unassigned. if adding to array and unassigned exists, remove unassigned.


// Put photo
// Delete photo

// module.exports = Router

