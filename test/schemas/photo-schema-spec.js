process.env.NODE_ENV = 'test'

const photoModel = require('../../database/schemas/photoSchema')

// server test file configuration allowing access to the chai and chai-http libraries.
const { mongoose, expect } = require('../test-config')

before(async function(done) {
	await mongoose.connection
		.dropCollection('photos')
		.catch(err => console.log(err))
		.then(done())
})

after(async function(done) {
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
		let photoTest = new photoModel({
			name: '',
			idNumber: 'mmb-255',
			category: 'person',
			location: 'file',
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		let photo = new photoModel({
			name: ['not a string'],
			idNumber: 'mmb-255',
			category: 'person',
			location: 'file',
			description: 'handsome fellow on a hill'
		})

		it('should be required', function(done) {
			photoTest.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		it('should be a string', function(done) {
			photo.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
	})

	describe('idNumber validation', function() {
		let testIdNum = new photoModel({
			name: 'Bob on a hill',
			idNumber: 654,
			category: 'person',
			location: 'file',
			description: 'handsome fellow on a hill'
		})

		let uniqueIdNumTest = new photoModel({
			name: 'Bob on a hill',
			idNumber: 'mmb-226',
			category: 'person',
			location: 'file',
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		let testUniqueIdNum = new photoModel({
			name: 'Bob on a hill',
			idNumber: 'mmb-226',
			category: 'person',
			location: 'file',
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		let idNumTest = new photoModel({
			name: 'testPhoto',
			idNumber: ['mmb-255'],
			category: ['not an array'],
			location: 'file',
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		it('should be required', function(done) {
			testIdNum.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		it('should confirm photo ID # is a string', function(done) {
			idNumTest.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		// it('should be unique', function(done) {
		//     testUniqueIdNum.save(function(err) {
		//         if (err) {
		//             console.error("first instance saved")
		//             done()
		//         }
		//         uniqueIdNumTest.validate(function(err) {
		//             expect(err).to.exist
		//             expect(err.name).to.equal('ValidationError')
		//             expect(err.errors.idNumber.message).to.equal(
		//                 "This item ID has already been entered. Please check original item."
		//             )
		//             done()
		//         })
		//     })

		// })
	})

	describe('category validation', function() {
		let categoryTest = new photoModel({
			name: 'testPhoto',
			idNumber: 'mmb-255',
			location: '',
			category: null,
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		let categoryTest2 = new photoModel({
			name: 'testPhoto',
			idNumber: 'mmb-255',
			category: null,
			location: 'file',
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		it('should be required', function(done) {
			categoryTest.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		it('should be an array', function(done) {
			categoryTest2.validate(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
			})
			done()
		})
	})

	describe('location validation', function() {
		let photo = new photoModel({
			name: 'Location Test',
			idNumber: 'mmb-255',
			category: [],
			location: [],
			description: 'handsome fellow on a hill',
			fileRef: 'fileRef'
		})

		it('should be a string', function(done) {
			photo.validate(err => {
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
	})

	describe('description validation', function() {
		let descriptionTest = new photoModel({
			name: 'testPhoto',
			idNumber: 'mmb-255',
			category: [],
			location: 'file',
			description: [],
			fileRef: 'fileRef'
		})

		let descriptionTest2 = new photoModel({
			name: 'testPhoto',
			idNumber: 'mmb-255',
			category: [],
			location: 'file',
			fileRef: 'fileRef'
		})

		it('should be a string', function(done) {
			descriptionTest.validate(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		it('should be required', function(done) {
			descriptionTest2.validate(err => {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})
	})
})
