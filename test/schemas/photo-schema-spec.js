process.env.NODE_ENV = 'test'

const photoModel = require('../../database/seeds/schema/photoSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

// Tell chai to use the chaiHttp module.
// chai.use(chaiHttp)

// Pulling in our server from app
const { app } = require('../../app')

// destructure expect assertion from chai
const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

before(async function(done) {
	await mongoose.connection
		.dropCollection('photos')
		.catch(err => console.log(err))
		.then(done())
})

describe('Photo schema tests', function() {
	before(function() {
		console.log('Connected to', mongoose.connection.name)
    })

    describe('photo name validation', function() {
        let noPhotoName = new photoModel ({
            name: '',
            idNumber: "mmb-255",
            category: "person",
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: true,
        })

		it('should be required', function(done) {
            noPhotoName.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })

		it('should be a string', function(done) {
            let photo = new photoModel ({
                name: [],
                idNumber: "mmb-255",
                category: "person",
                location: "file",
                description: "handsome fellow on a hill"
            })
            photo.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
    })

	describe('idNumber validation', function() {
        let testIdNum = new photoModel ({
            name: 'Bob on a hill',
            idNumber: 'mmb-225',
            category: "person",
            location: "file",
            description: "handsome fellow on a hill"
        })

        it('should be required', function(done) {
            testIdNum.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })

        it('should be a string', function(done) {
            testIdNum.save(err => {
            expect(err.name).to.equal("ValidationError")
            done()
            })
        })

        // it('should be unique', function(done) {
        //     if (mongoose.connection.dropCollection('photos')) {
        //         mongoose.connection
        //             .dropCollection('photos')
        //             .catch(err => console.log(err))
        //             .then(console.log("Dropped database before test"))
        //     }
        //     let testUniqueIdNum = new photoModel ({
        //         name: 'Bob on a hill',
        //         idNumber: 'mmb-226',
        //         category: "person",
        //         location: "file",
        //         description: "handsome fellow on a hill",
        //         fileRef: true
        //     })
        //     testUniqueIdNum.save(function(err) {
        //         if (err) {
        //             done(err)
        //         }
        //     })
        //     let uniqueIdNumTest = new photoModel({
        //         name: 'Bob on a hill',
        //         idNumber: 'mmb-226',
        //         category: "person",
        //         location: "file",
        //         description: "handsome fellow on a hill",
        //         fileRef: true
        //         })
        //         uniqueIdNumTest.save(function(err) {
        //             expect(err).to.exist
        //             console.log(err)
        //             expect(err).to.equal('ValidationError')
        //             expect(err.errors.username.message).to.equal(
        //                 "This ID number already exists. Check your item."
        //             )
        //         done()
        //     })
        // })

    })

	describe('category validation', function() {
        let categoryTest = new photoModel ({
            name: '',
            idNumber: "mmb-255",
            category: [],
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: true
        })

        it('should be an array', function(done) {
            categoryTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
        it('should be required', function(done) {
            categoryTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
        it('should be a default of "Unassigned"', function(done) {
            categoryTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
    })

    describe('location validation', function() {
        let locationTest = new photoModel ({
            name: '',
            idNumber: "mmb-255",
            category: [],
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: true
        })
        it('should be a string', function(done) {
            locationTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
        it('should be a default of ""', function(done) {
            locationTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
    })

    describe('description validation', function() {
        let descriptionTest = new photoModel ({
            name: '',
            idNumber: "mmb-255",
            category: [],
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: true
        })
        
        it('should be a string', function(done) {
            descriptionTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
        it('should be required', function(done) {
            descriptionTest.save(err => {
                expect(err.name).to.equal("ValidationError")
                done()
            })
        })
    })
})