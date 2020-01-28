process.env.NODE_ENV = 'test'

const photoModel = require('../../database/schemas/photoSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
const chaiHttp = require('chai-http')

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
        it('should be required', function(done) {
            let photoTest = new photoModel ({
            name: '',
            idNumber: "mmb-255",
            category: "person",
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: "fileRef"
        }).save(err => {
            expect(err.name).to.equal("ValidationError")
            })
        done()
        })

		it('should be a string', function(done) {
            let photo = new photoModel ({
                name: ["not a string"],
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
            idNumber: 654,
            category: "person",
            location: "file",
            description: "handsome fellow on a hill"
        })

        it('should be required', function(done) {
            testIdNum.save(err => {
                expect(err.name).to.equal("ValidationError")
            })
            done()
        })

        it('should confirm photo ID # is a string', async function(done) {
            let idNumTest = new photoModel ({
                name: 'testPhoto',
                idNumber: ["mmb-255"],
                category: ["not an array"],
                location: "file",
                description: "handsome fellow on a hill",
                fileRef: "fileRef"
            })

            await photoModel
                .create(idNumTest)
                .then(photo => {
                    expect(photo.idNumber).to.be.a('string')
                })
                .catch(err => expect(err.name).to.equal('ValidationError'))
                .then(done())
        })

        it('should be unique', function(done) {
            let testUniqueIdNum = new photoModel ({
                name: 'Bob on a hill',
                idNumber: 'mmb-226',
                category: "person",
                location: "file",
                description: "handsome fellow on a hill",
                fileRef: "fileRef"
            })
            testUniqueIdNum.save(function(err) {
                if (err) {
                    done(err)
                    console.error("first instance saved")
                }
                let uniqueIdNumTest = new photoModel({
                    name: 'Bob on a hill',
                    idNumber: 'mmb-226',
                    category: "person",
                    location: "file",
                    description: "handsome fellow on a hill",
                    fileRef: "fileRef"
                    })
                uniqueIdNumTest
                    .save(function(err) {
                        expect(err).to.exist
                        expect(err.name).to.equal('ValidationError')
                        expect(err.errors.idNumber.message).to.equal(
                            "This item ID has already been entered. Please check original item."
                        )
                    done()
                })
            })

        })

    })

	describe('category validation', function() {
        it('should have category as an array', async function(done) {
            let categoryTest = new photoModel ({
                name: 'testPhoto',
                idNumber: "mmb-255",
                category: "not an array",
                location: "file",
                description: "handsome fellow on a hill",
                fileRef: "fileRef"
            })

            await photoModel
                .create(categoryTest)
                .then(photo => {
                    expect(photo.category).to.be.a('Array')
                })
                .catch(err => expect(err.name).to.equal('ValidationError'))
                .then(done())
        })

        it('should be required', function(done) {
            let categoryTest = new photoModel ({
                name: 'testPhoto',
                idNumber: "mmb-255",
                category: "",
                location: "file",
                description: "handsome fellow on a hill",
                fileRef: "fileRef"
            })
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
            location: [],
            description: "handsome fellow on a hill",
            fileRef: "fileRef"
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
            name: 'testPhoto',
            idNumber: "mmb-255",
            category: [],
            location: "file",
            description: "handsome fellow on a hill",
            fileRef: "fileRef"
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