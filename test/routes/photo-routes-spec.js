process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')
const { app } = require('../../app')
const { photoModel } = require('../../database/schemas/photoSchema')


// describe('Photo testing', () => {
//     let testPhoto1 = {
//         name: "Test Photo",
//         idNumber: "mmb-897",
//         location: "Files",
//         category: ["people, year, 1942"],
//         description: "Testing a test photo",
//         fileRef: "ajsd0"
//     }

//     let testPhoto2 = {
//         name: "Second Test Photo",
//         idNumber: "mmb-817",
//         location: "Files",
//         category: ["people, year, 1942"],
//         description: "Testing another test photo",
//         fileRef: "alk12d0"
//     }
//             chai 
//                 .request(app)
//                 .post('/photos')
//                 .send(testPhoto1)
//                 .end((err, res) =>{
//                     if (err) {
//                         done(new Error("Photo was not saved."))
//                     } else {
//                         console.log("Photo was saved.")
//                         done()
//                     }
//                 })
//             }
  
//     describe('/GET data', () => {
//         it('should GET all "/photos"', (done) => {
//             chai.request(app)
//                 .get('/photos')
//                 .end((err, res) => {
//                     if (!err) {
//                         expect(res).to.have.status(200)
//                         expect(res.body.name).to.equal("Test Photo")
//                         expect(res.body.location).to.equal("Files")
//                         done() 
//                 } else {
//                     done(err)
//                 }
//             })
//         })
//     })

//     // Post photo
// describe('POST a photo', function() {
//     it('should return a 201', function(done) {
//         chai
//             .request(app)
//             .get('/photos/id')
//             .send({
//                 name: "Portrait of man",
//                 idNumber: "mmb-189",
//                 location: "drawer",
//                 category: ["politician", "military"], 
//                 description: "blah blah blah",
//                 fileRef: "present"
//             })
//             .end(function(err, res){
//                 expect(res).have.property('name')
//                 expect(res).have.property('idNumber')
//                 expect(res).have.property('category')
//                 expect(res).have.property('location')
//                 expect(res).have.property('description')
//                 expect(res).have.status(200)
//                 done()
//             })
//     })
// })
// Put photo
// Delete photo

// module.exports = Router

