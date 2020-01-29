process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../../app')
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')
const { photoModel } = require('../../database/schemas/photoSchema')
const { createPhoto, volunteerToken } = require('../data')

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

// describe('Photo CRUD testing', function() {

//     it("Test route", function(done) {
//         chai
//             .request(app)
//             .post('/photos')
//             .end((err, res) =>{
//                 if (!err) {
//                     expect(res).to.have.status(200)
//                     done()
//                 } else {
//                     done(err)
//                 }
//         })
//     })
  
//     describe('Create photo', function () {
//         it('Should return a 201 if successfull', function (done) {
//             chai
//                 .request(app)
//                 .post('/photos')
//                 .set('Authorisation', `Bearer ${volunteerToken}`)
//                 .send({
//                     name: 'Test Passes',
//                     idNumber: "mmb-whatever",
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
//                         expect(res.body).to.equal('Photo has successfully been created')
//                     }
//                 })
//             })
//         })



// })

// if an array is [] empty, add unassigned. if adding to array and unassigned exists, remove unassigned.


// Put photo
// Delete photo

// module.exports = Router

