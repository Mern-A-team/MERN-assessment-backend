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
            description: "handsome fellow on a hill"
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

	describe('category validation', function() {
		it('should be a string')
        it('should be required')
        it('should be a default of "Unassigned"')
    })

    describe('location validation', function() {
		it('should be a string')
        it('should be a default of ""')
    })

    describe('description validation', function() {
		it('should be a string')
        it('should be required')
    })

	// after(function() {
	// 	mongoose.connection.dropDatabase()
	// })
    })
})
