process.env.NODE_ENV = 'test'

const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')

chai.use(chaiHttp)

// const app = require('../../app')
// const { expect } = chai
// const { mongoose } = require('../../config/mongoose-connection')
const photoModel = require('../../database/schemas/photoSchema')
const { createPhoto, volunteerToken, adminToken, guestToken } = require('../data')

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
            .get('/')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
    })
  
    describe('Create photo', function () {
        describe('A photo created by a volunteer', function() {
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
                            console.log(err)
                            done(err)
                        } else {
                            console.log(res)
                            expect(res).to.have.status(201)
                            expect(res.body).to.equal('Photo successfully saved!')
                            done()
                        }
                    })
            })
        })
    //     describe('Add a photo by Admin', function() {
    //         it ('should return a 201 if successful', function(done) {
    //             chai
    //                 .request(app)
    //                 .post('/photos/addPhoto')
    //                 .set('Authorization', `Bearer ${adminToken}`)
    //                 .send({
    //                     name: 'Test Passes',
    //                     idNumber: "mmb-something",
    //                     location: "File cabinet",
    //                     category: ["array", "of", "subjects"],
    //                     description: "Blah blah",
    //                     fileRef: "id string"
    //                 })
    //                 .end((err, res) => {
    //                     if (err) {
    //                         done(err)
    //                     } else {
    //                         expect(res).to.have.status(201)
    //                         expect(res.body).to.equal('Photo successfully saved!')
    //                         done()
    //                     }
    //                 })
    //             })

    //     })
    // })

    // describe ('Editing a Photo', function() {
    //     describe('Edit done by a volunteer', function() {
    //         it('should update the details of a photo', function(done) {
    //             photoModel
    //                 .findOne({ name: 'testPhoto1' })
    //                 .then(photo => {
    //             chai
    //                 .request(app)
    //                 .put(`/photos/${photo._id}`)
    //                 .set('Authorization', `Bearer ${volunteerToken}`)
    //                 .send({
    //                     name: 'Test Passes',
    //                     idNumber: "mmb-29837",
    //                     location: "File cabinet",
    //                     category: ["array", "of", "subjects"],
    //                     description: "Blah blah",
    //                     fileRef: "id string"
    //                 })
    //                 .end((err, res) => {
    //                     if(err) {
    //                         done(err)
    //                     } else {
    //                         expect(res.status).to.equal(200)
    //                         expect(res.body.message).to.equal('Photo details successfully updated!')
    //                         done()
    //                     }
    //                 })
    //             })
    //         })
    //     })
    // })

    // describe("Edit done by an Admin",  function() {
    //     it('should update the details of a photo', function(done) {
    //         photoModel
    //             .find()
    //             .then(photos => {
    //         chai
    //             .request(app)
    //             .put(`/photos/${photos[0]._id}`)
    //             .set('Authorization', `Bearer ${adminToken}`)
    //             .send({
    //                 name: 'Test Passes',
    //                 idNumber: "mmb-222222",
    //                 location: "File cabinet",
    //                 category: ["array", "of", "subjects"],
    //                 description: "Blah blah",
    //                 fileRef: "id string"
    //             })
    //             .end((err, res) => {
    //                 if(err) {
    //                     done(err)
    //                 } else {
    //                     expect(res.status).to.equal(200)
    //                     expect(res.body.message).to.equal('Photo details successfully updated!')
    //                     done()
    //                 }
    //             })
    //         })
    //     })
    // })
    // describe("Edit attempted by guest", function() {
    //     it('should return a 401 when a guest tries to edit photo', function(done) {
    //         photoModel
    //             .findOne({ name: 'Test Passes' })
    //             .then(photo => {
    //         chai
    //             .request(app)
    //             .put(`/photos/${photo._id}`)
    //             .set('Authorization', null)
    //             .send({
    //                 name: 'Test Passes',
    //                 idNumber: "mmb-22",
    //                 location: "File cabinet",
    //                 category: ["array", "of", "subjects"],
    //                 description: "Blah blah",
    //                 fileRef: "id string"
    //             })
    //             .end((err, res) => {
    //                 if(err) {
    //                     done(err)
    //                 } else {
    //                     expect(res.status).to.equal(401)
    //                     expect(res.body.message).to.equal('Permission denied. You do not have authorisation to perform this task!')
    //                     done()
    //                 }
    //             })
    //         })
    //     })
    // })

    // describe("Returns a photo by ID", function() {
    //     it('Should return a photo with an id', function(done) {
    //         const newPhoto = new photoModel({
    //             name: 'New photo 1',
    //             idNumber: "mmb-111",
    //             location: "File cabinet",
    //             category: ["array", "of", "subjects"],
    //             description: "Blah blah",
    //             fileRef: "id string"
    //         })
    //         newPhoto.save((err, photo) => {
    //             chai
    //                 .request(app)
    //                 .get('/photos/' + photo._id)
    //                 .send(photo)
    //                 .end((err, res) => {
    //                     expect(res.status).to.equal(200)
    //                     expect(res.body).to.have.property('name')
    //                     expect(res.body).to.have.property('idNumber')
    //                     done()
    //                 })
    //             })
    //     })
    })

})



// if an array is [] empty, add unassigned. if adding to array and unassigned exists, remove unassigned.


// Put photo
// Delete photo

// module.exports = Router